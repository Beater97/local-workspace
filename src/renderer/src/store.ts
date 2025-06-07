import { configureStore } from '@reduxjs/toolkit';
import typeReducer from './slices/typeSlice';
import statusReducer from './slices/statusSlice';
import clienteReducer from './slices/clienteSlice';
import activityReducer from './slices/activitySlice';

const store = configureStore({
  reducer: {
    type: typeReducer,
    status: statusReducer,
    cliente: clienteReducer,
    activity: activityReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 🔥 Esporta tutti i tipi globalmente
export type { TypeState } from './slices/typeSlice';
export type { StatusState } from './slices/statusSlice';
export type { ClienteState } from './slices/clienteSlice';
export type { ActivityState } from './slices/activitySlice';

export default store;
