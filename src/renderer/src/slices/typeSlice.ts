import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TypeState {
  data: Type[];
  loading: boolean;
  error: string | null;
}

const initialState: TypeState = {
  data: [],
  loading: false,
  error: null
};

// 📦 READ ALL
export const fetchTypes = createAsyncThunk('type/fetchAll', async () => {
  const res = await window.api.type.readAll();
  if (!res.success) console.log(res);
  return res.data;
});

// 📦 CREATE
export const createType = createAsyncThunk('type/create', async (newType: Partial<Type>, { dispatch }) => {
  const res = await window.api.type.create(newType);
  if (!res.success) console.log(res);
  dispatch(fetchTypes());
  return res.data;
});

// 📦 READ BY ID
export const fetchTypeById = createAsyncThunk('type/fetchById', async (id: number) => {
  const res = await window.api.type.readById(id);
  if (!res.success) console.log(res);
  return res.data;
});

// 📦 UPDATE
export const updateType = createAsyncThunk('type/update', async ({ id, data }: { id: number; data: Partial<Type> }, { dispatch }) => {
  const res = await window.api.type.update(id, data);
  if (!res.success) console.log(res);
  dispatch(fetchTypes());
  return;
});

// 📦 DELETE
export const deleteType = createAsyncThunk('type/delete', async (id: number, { dispatch }) => {
  const res = await window.api.type.delete(id);
  if (!res.success) console.log(res);
  dispatch(fetchTypes());
  return;
});

const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    clearTypes: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 🔥 FETCH ALL
      .addCase(fetchTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTypes.fulfilled, (state, action: PayloadAction<Type[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore sconosciuto';
      })

      // 🔥 CREATE
      .addCase(createType.pending, (state) => {
        state.loading = true;
      })
      .addCase(createType.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante la creazione';
      })

      // 🔥 READ BY ID (opzionale: puoi anche loggare o usare un altro slice per "selected")
      .addCase(fetchTypeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTypeById.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchTypeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante la lettura';
      })

      // 🔥 UPDATE
      .addCase(updateType.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateType.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante l\'update';
      })

      // 🔥 DELETE
      .addCase(deleteType.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteType.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante la cancellazione';
      });
  }
});

export const { clearTypes } = typeSlice.actions;
export default typeSlice.reducer;

