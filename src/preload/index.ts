import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  // 📦 Note
  note: {
    create: (data: Partial<Note>) => ipcRenderer.invoke('note:create', data),
    readAll: () => ipcRenderer.invoke('note:readAll'),
    readById: (id: number) => ipcRenderer.invoke('note:readById', id),
    update: (id: number, data: Partial<Note>) => ipcRenderer.invoke('note:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('note:delete', id)
  },

  // 📦 Task
  task: {
    create: (data: Partial<Task>) => ipcRenderer.invoke('task:create', data),
    readAll: () => ipcRenderer.invoke('task:readAll'),
    readById: (id: number) => ipcRenderer.invoke('task:readById', id),
    update: (id: number, data: Partial<Task>) => ipcRenderer.invoke('task:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('task:delete', id)
  },

  // 📦 KanbanColumn
  kanbanColumn: {
    create: (data: Partial<KanbanColumn>) => ipcRenderer.invoke('kanbanColumn:create', data),
    readAll: () => ipcRenderer.invoke('kanbanColumn:readAll'),
    readById: (id: number) => ipcRenderer.invoke('kanbanColumn:readById', id),
    update: (id: number, data: Partial<KanbanColumn>) =>
      ipcRenderer.invoke('kanbanColumn:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('kanbanColumn:delete', id)
  },

  // 📦 Folder
  folder: {
    create: (data: Partial<Folder>) => ipcRenderer.invoke('folder:create', data),
    readAll: () => ipcRenderer.invoke('folder:readAll'),
    readById: (id: number) => ipcRenderer.invoke('folder:readById', id),
    update: (id: number, data: Partial<Folder>) => ipcRenderer.invoke('folder:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('folder:delete', id)
  },

  // 📦 Attachment
  attachment: {
    create: (data: Partial<Attachment>) => ipcRenderer.invoke('attachment:create', data),
    readAll: () => ipcRenderer.invoke('attachment:readAll'),
    readById: (id: number) => ipcRenderer.invoke('attachment:readById', id),
    update: (id: number, data: Partial<Attachment>) =>
      ipcRenderer.invoke('attachment:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('attachment:delete', id)
  },

  // 📦 Password
  password: {
    create: (data: Partial<Password>) => ipcRenderer.invoke('password:create', data),
    readAll: () => ipcRenderer.invoke('password:readAll'),
    readById: (id: number) => ipcRenderer.invoke('password:readById', id),
    update: (id: number, data: Partial<Password>) =>
      ipcRenderer.invoke('password:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('password:delete', id)
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore
  window.electron = electronAPI
  // @ts-ignore
  window.api = api
}
