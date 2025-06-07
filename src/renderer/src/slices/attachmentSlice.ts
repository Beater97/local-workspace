import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AttachmentState {
  data: Attachment[];
  loading: boolean;
  error: string | null;
}
const initialAttachmentState: AttachmentState = {
  data: [],
  loading: false,
  error: null,
};
export const fetchAttachments = createAsyncThunk('attachment/fetchAll', async () => {
  const res = await window.api.attachment.readAll();
  if (!res.success) console.log(res);
  return res.data;
});
export const createAttachment = createAsyncThunk('attachment/create', async (newAttachment: Partial<Attachment>, { dispatch }) => {
  const res = await window.api.attachment.create(newAttachment);
  if (!res.success) console.log(res);
  dispatch(fetchAttachments());
  return res.data;
});
export const updateAttachment = createAsyncThunk('attachment/update', async ({ id, data }: { id: number; data: Partial<Attachment> }, { dispatch }) => {
  const res = await window.api.attachment.update(id, data);
  if (!res.success) console.log(res);
  dispatch(fetchAttachments());
  return;
});
export const deleteAttachment = createAsyncThunk('attachment/delete', async (id: number, { dispatch }) => {
  const res = await window.api.attachment.delete(id);
  if (!res.success) console.log(res);
  dispatch(fetchAttachments());
  return;
});
const attachmentSlice = createSlice({
  name: 'attachment',
  initialState: initialAttachmentState,
  reducers: {
    clearAttachments: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttachments.pending, (state) => { state.loading = true; })
      .addCase(fetchAttachments.fulfilled, (state, action: PayloadAction<Attachment[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchAttachments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore sconosciuto';
      })

      .addCase(createAttachment.pending, (state) => { state.loading = true; })
      .addCase(createAttachment.fulfilled, (state) => { state.loading = false; })
      .addCase(createAttachment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante la creazione';
      })

      .addCase(updateAttachment.pending, (state) => { state.loading = true; })
      .addCase(updateAttachment.fulfilled, (state) => { state.loading = false; })
      .addCase(updateAttachment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante l\'update';
      })

      .addCase(deleteAttachment.pending, (state) => { state.loading = true; })
      .addCase(deleteAttachment.fulfilled, (state) => { state.loading = false; })
      .addCase(deleteAttachment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Errore durante la cancellazione';
      });
  }
});
export const { clearAttachments } = attachmentSlice.actions;
export default attachmentSlice.reducer