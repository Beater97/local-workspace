import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface KanbanColumnState {
  data: KanbanColumn[]
  loading: boolean
  error: string | null
}
const initialKanbanColumnState: KanbanColumnState = {
  data: [],
  loading: false,
  error: null
}
export const fetchKanbanColumns = createAsyncThunk('kanbanColumn/fetchAll', async () => {
  const res = await window.api.kanbanColumn.readAll()
  if (!res.success) console.log(res)
  return res.data
})
export const createKanbanColumn = createAsyncThunk(
  'kanbanColumn/create',
  async (newColumn: Partial<KanbanColumn>, { dispatch }) => {
    const res = await window.api.kanbanColumn.create(newColumn)
    if (!res.success) console.log(res)
    dispatch(fetchKanbanColumns())
    return res.data
  }
)
export const updateKanbanColumn = createAsyncThunk(
  'kanbanColumn/update',
  async ({ id, data }: { id: number; data: Partial<KanbanColumn> }, { dispatch }) => {
    const res = await window.api.kanbanColumn.update(id, data)
    if (!res.success) console.log(res)
    dispatch(fetchKanbanColumns())
    return
  }
)
export const deleteKanbanColumn = createAsyncThunk(
  'kanbanColumn/delete',
  async (id: number, { dispatch }) => {
    const res = await window.api.kanbanColumn.delete(id)
    if (!res.success) console.log(res)
    dispatch(fetchKanbanColumns())
    return
  }
)
const kanbanColumnSlice = createSlice({
  name: 'kanbanColumn',
  initialState: initialKanbanColumnState,
  reducers: {
    clearKanbanColumns: (state) => {
      state.data = []
      state.loading = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKanbanColumns.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchKanbanColumns.fulfilled, (state, action: PayloadAction<KanbanColumn[]>) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(fetchKanbanColumns.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Errore sconosciuto'
      })

      .addCase(createKanbanColumn.pending, (state) => {
        state.loading = true
      })
      .addCase(createKanbanColumn.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createKanbanColumn.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Errore durante la creazione'
      })

      .addCase(updateKanbanColumn.pending, (state) => {
        state.loading = true
      })
      .addCase(updateKanbanColumn.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateKanbanColumn.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Errore durante l'update"
      })

      .addCase(deleteKanbanColumn.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteKanbanColumn.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteKanbanColumn.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Errore durante la cancellazione'
      })
  }
})
export const { clearKanbanColumns } = kanbanColumnSlice.actions
export default kanbanColumnSlice.reducer
