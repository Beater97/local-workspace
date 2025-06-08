import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
export interface FolderState {
  data: Folder[]
  loading: boolean
  error: string | null
}
const initialFolderState: FolderState = {
  data: [],
  loading: false,
  error: null
}
export const fetchFolders = createAsyncThunk('folder/fetchAll', async () => {
  const res = await window.api.folder.readAll()
  if (!res.success) console.log(res)
  return res.data
})
export const createFolder = createAsyncThunk(
  'folder/create',
  async (newFolder: Partial<Folder>, { dispatch }) => {
    const res = await window.api.folder.create(newFolder)
    if (!res.success) console.log(res)
    dispatch(fetchFolders())
    return res.data
  }
)
export const updateFolder = createAsyncThunk(
  'folder/update',
  async ({ id, data }: { id: number; data: Partial<Folder> }, { dispatch }) => {
    const res = await window.api.folder.update(id, data)
    if (!res.success) console.log(res)
    dispatch(fetchFolders())
    return
  }
)
export const deleteFolder = createAsyncThunk('folder/delete', async (id: number, { dispatch }) => {
  const res = await window.api.folder.delete(id)
  if (!res.success) console.log(res)
  dispatch(fetchFolders())
  return
})
const folderSlice = createSlice({
  name: 'folder',
  initialState: initialFolderState,
  reducers: {
    clearFolders: (state) => {
      state.data = []
      state.loading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFolders.fulfilled, (state, action: PayloadAction<Folder[]>) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Errore sconosciuto'
      })

      .addCase(createFolder.pending, (state) => {
        state.loading = true
      })
      .addCase(createFolder.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Errore durante la creazione'
      })

      .addCase(updateFolder.pending, (state) => {
        state.loading = true
      })
      .addCase(updateFolder.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateFolder.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Errore durante l'update"
      })

      .addCase(deleteFolder.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteFolder.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteFolder.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Errore durante la cancellazione'
      })
  }
})
export const { clearFolders } = folderSlice.actions
export default folderSlice.reducer
