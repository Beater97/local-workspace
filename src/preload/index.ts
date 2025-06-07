import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

const api = {
  // 📦 Type
  type: {
    create: (data: Partial<Type>) => ipcRenderer.invoke('type:create', data),
    readAll: () => ipcRenderer.invoke('type:readAll'),
    readById: (id: number) => ipcRenderer.invoke('type:readById', id),
    update: (id: number, data: Partial<Type>) => ipcRenderer.invoke('type:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('type:delete', id)
  },

  // 📦 Status
  status: {
    create: (data: Partial<Status>) => ipcRenderer.invoke('status:create', data),
    readAll: () => ipcRenderer.invoke('status:readAll'),
    readById: (id: number) => ipcRenderer.invoke('status:readById', id),
    update: (id: number, data: Partial<Status>) => ipcRenderer.invoke('status:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('status:delete', id)
  },

  // 📦 Cliente
  cliente: {
    create: (data: Partial<Cliente>) => ipcRenderer.invoke('cliente:create', data),
    readAll: () => ipcRenderer.invoke('cliente:readAll'),
    readById: (id: number) => ipcRenderer.invoke('cliente:readById', id),
    update: (id: number, data: Partial<Cliente>) => ipcRenderer.invoke('cliente:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('cliente:delete', id)
  },

  // 📦 Activity
  activity: {
    create: (data: Partial<Activity>) => ipcRenderer.invoke('activity:create', data),
    readAll: () => ipcRenderer.invoke('activity:readAll'),
    readById: (id: number) => ipcRenderer.invoke('activity:readById', id),
    update: (id: number, data: Partial<Activity>) => ipcRenderer.invoke('activity:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('activity:delete', id)
  }
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore
  window.electron = electronAPI;
  // @ts-ignore
  window.api = api;
}
