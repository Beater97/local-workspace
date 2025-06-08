import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
export interface PasswordState {
  data: Password[]
  loading: boolean
  error: string | null
}
const initialPasswordState: PasswordState = {
  data: [],
  loading: false,
  error: null
}
export const fetchPasswords = createAsyncThunk('password/fetchAll', async () => {
  const res = await window.api.password.readAll()
  if (!res.success) console.log(res)
  return res.data
})
export const createPassword = createAsyncThunk(
  'password/create',
  async (newPassword: Partial<Password>, { dispatch }) => {
    const res = await window.api.password.create(newPassword)
    if (!res.success) console.log(res)
    dispatch(fetchPasswords())
    return res.data
  }
)
export const updatePassword = createAsyncThunk(
  'password/update',
  async ({ id, data }: { id: number; data: Partial<Password> }, { dispatch }) => {
    const res = await window.api.password.update(id, data)
    if (!res.success) console.log(res)
    dispatch(fetchPasswords())
    return
  }
)
export const deletePassword = createAsyncThunk(
  'password/delete',
  async (id: number, { dispatch }) => {
    const res = await window.api.password.delete(id)
    if (!res.success) console.log(res)
    dispatch(fetchPasswords())
    return
  }
)
const passwordSlice = createSlice({
  name: 'password',
  initialState: initialPasswordState,
  reducers: {
    clearPasswords: (state) => {
      state.data = []
      state.loading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPasswords.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPasswords.fulfilled, (state, action: PayloadAction<Password[]>) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(fetchPasswords.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Errore sconosciuto'
      })

      .addCase(createPassword.pending, (state) => {
        state.loading = true
      })
      .addCase(createPassword.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Errore durante la creazione'
      })

      .addCase(updatePassword.pending, (state) => {
        state.loading = true
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Errore durante l'update"
      })

      .addCase(deletePassword.pending, (state) => {
        state.loading = true
      })
      .addCase(deletePassword.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deletePassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Errore durante la cancellazione'
      })
  }
})
export const { clearPasswords } = passwordSlice.actions
export default passwordSlice.reducer
