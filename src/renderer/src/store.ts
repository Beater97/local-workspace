import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './slices/noteSlice'
import taskReducer from './slices/taskSlice'
import kanbanColumnReducer from './slices/kanbanColumnSlice'
import folderReducer from './slices/folderSlice'
import attachmentReducer from './slices/attachmentSlice'
import passwordReducer from './slices/passwordSlice'

const store = configureStore({
  reducer: {
    note: noteReducer,
    task: taskReducer,
    kanbanColumn: kanbanColumnReducer,
    folder: folderReducer,
    attachment: attachmentReducer,
    password: passwordReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// 🔥 Esporta tutti i tipi globalmente (aggiungi anche quelli nuovi)
export type { NoteState } from './slices/noteSlice'
export type { TaskState } from './slices/taskSlice'
export type { KanbanColumnState } from './slices/kanbanColumnSlice'
export type { FolderState } from './slices/folderSlice'
export type { AttachmentState } from './slices/attachmentSlice'
export type { PasswordState } from './slices/passwordSlice'

export default store
