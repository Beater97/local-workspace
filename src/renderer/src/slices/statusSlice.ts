import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StatusState {
  data: Status[];
  loading: boolean;
  error: string | null;
}

const initialState: StatusState = {
  data: [],
  loading: false,
  error: null
};

export const fetchStatuses = createAsyncThunk('status/fetchAll', async () => {
  const res = await window.api.status.readAll();
  if (!res.success) console.log(res);
  return res.data;
});

export const createStatus = createAsyncThunk('status/create', async (newStatus: Partial<Status>, { dispatch }) => {
  const res = await window.api.status.create(newStatus);
  if (!res.success) console.log(res);
  dispatch(fetchStatuses());
  return res.data;
});

export const updateStatus = createAsyncThunk('status/update', async ({ id, data }: { id: number; data: Partial<Status> }, { dispatch }) => {
  const res = await window.api.status.update(id, data);
  if (!res.success) console.log(res);
  dispatch(fetchStatuses());
  return;
});

export const deleteStatus = createAsyncThunk('status/delete', async (id: number, { dispatch }) => {
  const res = await window.api.status.delete(id);
  if (!res.success) console.log(res);
  dispatch(fetchStatuses());
  return;
});

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    clearStatuses: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatuses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatuses.fulfilled, (state, action: PayloadAction<Status[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchStatuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore sconosciuto';
      })

      .addCase(createStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante la creazione';
      })

      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante l\'update';
      })

      .addCase(deleteStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante la cancellazione';
      });
  }
});

export const { clearStatuses } = statusSlice.actions;
export default statusSlice.reducer;
