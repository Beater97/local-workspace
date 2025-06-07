import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ActivityState {
  data: Activity[];
  loading: boolean;
  error: string | null;
}

const initialState: ActivityState = {
  data: [],
  loading: false,
  error: null
};

export const fetchActivities = createAsyncThunk('activity/fetchAll', async () => {
  const res = await window.api.activity.readAll();
  if (!res.success) console.log(res);
  return res.data;
});

export const createActivity = createAsyncThunk('activity/create', async (newActivity: Partial<Activity>, { dispatch }) => {
  const res = await window.api.activity.create(newActivity);
  if (!res.success) console.log(res);
  dispatch(fetchActivities());
  return res.data;
});

export const updateActivity = createAsyncThunk('activity/update', async ({ id, data }: { id: number; data: Partial<Activity> }, { dispatch }) => {
  const res = await window.api.activity.update(id, data);
  if (!res.success) console.log(res);
  dispatch(fetchActivities());
  return;
});

export const deleteActivity = createAsyncThunk('activity/delete', async (id: number, { dispatch }) => {
  const res = await window.api.activity.delete(id);
  if (!res.success) console.log(res);
  dispatch(fetchActivities());
  return;
});

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    clearActivities: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivities.fulfilled, (state, action: PayloadAction<Activity[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore sconosciuto';
      })

      .addCase(createActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(createActivity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante la creazione';
      })

      .addCase(updateActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateActivity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante l\'update';
      })

      .addCase(deleteActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteActivity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante la cancellazione';
      });
  }
});

export const { clearActivities } = activitySlice.actions;
export default activitySlice.reducer;
