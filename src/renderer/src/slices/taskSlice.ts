import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface TaskState {
  data: Task[];
  loading: boolean;
  error: string | null;
}
const initialTaskState: TaskState = {
  data: [],
  loading: false,
  error: null,
};
export const fetchTasks = createAsyncThunk('task/fetchAll', async () => {
  const res = await window.api.task.readAll();
  if (!res.success) console.log(res);
  return res.data;
});
export const createTask = createAsyncThunk('task/create', async (newTask: Partial<Task>, { dispatch }) => {
  const res = await window.api.task.create(newTask);
  if (!res.success) console.log(res);
  dispatch(fetchTasks());
  return res.data;
});
export const updateTask = createAsyncThunk('task/update', async ({ id, data }: { id: number; data: Partial<Task> }, { dispatch }) => {
  const res = await window.api.task.update(id, data);
  if (!res.success) console.log(res);
  dispatch(fetchTasks());
  return;
});
export const deleteTask = createAsyncThunk('task/delete', async (id: number, { dispatch }) => {
  const res = await window.api.task.delete(id);
  if (!res.success) console.log(res);
  dispatch(fetchTasks());
  return;
});
const taskSlice = createSlice({
  name: 'task',
  initialState: initialTaskState,
  reducers: {
    clearTasks: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.loading = true; })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore sconosciuto';
      })

      .addCase(createTask.pending, (state) => { state.loading = true; })
      .addCase(createTask.fulfilled, (state) => { state.loading = false; })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante la creazione';
      })

      .addCase(updateTask.pending, (state) => { state.loading = true; })
      .addCase(updateTask.fulfilled, (state) => { state.loading = false; })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante l\'update';
      })

      .addCase(deleteTask.pending, (state) => { state.loading = true; })
      .addCase(deleteTask.fulfilled, (state) => { state.loading = false; })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante la cancellazione';
      });
  }
});
export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer