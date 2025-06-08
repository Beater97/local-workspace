import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// ------------ NOTE ------------
export interface NoteState {
  data: Note[]
  loading: boolean
  error: string | null
}
const initialNoteState: NoteState = {
  data: [],
  loading: false,
  error: null
}
export const fetchNotes = createAsyncThunk('note/fetchAll', async () => {
  const res = await window.api.note.readAll()
  if (!res.success) console.log(res)
  return res.data
})
export const createNote = createAsyncThunk(
  'note/create',
  async (newNote: Partial<Note>, { dispatch }) => {
    const res = await window.api.note.create(newNote)
    if (!res.success) console.log(res)
    dispatch(fetchNotes())
    return res.data
  }
)
export const updateNote = createAsyncThunk(
  'note/update',
  async ({ id, data }: { id: number; data: Partial<Note> }, { dispatch }) => {
    const res = await window.api.note.update(id, data)
    if (!res.success) console.log(res)
    dispatch(fetchNotes())
    return
  }
)
export const deleteNote = createAsyncThunk('note/delete', async (id: number, { dispatch }) => {
  const res = await window.api.note.delete(id)
  if (!res.success) console.log(res)
  dispatch(fetchNotes())
  return
})
const noteSlice = createSlice({
  name: 'note',
  initialState: initialNoteState,
  reducers: {
    clearNotes: (state) => {
      state.data = []
      state.loading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Errore sconosciuto'
      })

      .addCase(createNote.pending, (state) => {
        state.loading = true
      })
      .addCase(createNote.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Errore durante la creazione'
      })

      .addCase(updateNote.pending, (state) => {
        state.loading = true
      })
      .addCase(updateNote.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Errore durante l'update"
      })

      .addCase(deleteNote.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteNote.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Errore durante la cancellazione'
      })
  }
})
export const { clearNotes } = noteSlice.actions
export default noteSlice.reducer
