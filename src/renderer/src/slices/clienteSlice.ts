import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ClienteState {
  data: Cliente[];
  loading: boolean;
  error: string | null;
}

const initialState: ClienteState = {
  data: [],
  loading: false,
  error: null
};

export const fetchClientes = createAsyncThunk('cliente/fetchAll', async () => {
  const res = await window.api.cliente.readAll();
  if (!res.success) console.log(res);;
  return res.data;
});

export const createCliente = createAsyncThunk('cliente/create', async (newCliente: Partial<Cliente>, { dispatch }) => {
  const res = await window.api.cliente.create(newCliente);
  if (!res.success) console.log(res);;
  dispatch(fetchClientes());
  return res.data;
});

export const updateCliente = createAsyncThunk('cliente/update', async ({ id, data }: { id: number; data: Partial<Cliente> }, { dispatch }) => {
  const res = await window.api.cliente.update(id, data);
  if (!res.success) console.log(res);;
  dispatch(fetchClientes());
  return;
});

export const deleteCliente = createAsyncThunk('cliente/delete', async (id: number, { dispatch }) => {
  const res = await window.api.cliente.delete(id);
  if (!res.success) console.log(res);;
  dispatch(fetchClientes());
  return;
});

const clienteSlice = createSlice({
  name: 'cliente',
  initialState,
  reducers: {
    clearClientes: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientes.fulfilled, (state, action: PayloadAction<Cliente[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchClientes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore sconosciuto';
      })

      .addCase(createCliente.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCliente.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCliente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante la creazione';
      })

      .addCase(updateCliente.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCliente.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCliente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante l\'update';
      })

      .addCase(deleteCliente.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCliente.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCliente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante la cancellazione';
      });
  }
});

export const { clearClientes } = clienteSlice.actions;
export default clienteSlice.reducer;
