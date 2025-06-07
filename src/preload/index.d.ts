import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      type: {
        create: (data: Partial<Type>) => Promise<{ success: boolean; data: number }>;
        readAll: () => Promise<{ success: boolean; data: Type[] }>;
        readById: (id: number) => Promise<{ success: boolean; data: Type | undefined }>;
        update: (id: number, data: Partial<Type>) => Promise<{ success: boolean; data: void }>;
        delete: (id: number) => Promise<{ success: boolean; data: void }>;
      };
      status: {
        create: (data: Partial<Status>) => Promise<{ success: boolean; data: number }>;
        readAll: () => Promise<{ success: boolean; data: Status[] }>;
        readById: (id: number) => Promise<{ success: boolean; data: Status | undefined }>;
        update: (id: number, data: Partial<Status>) => Promise<{ success: boolean; data: void }>;
        delete: (id: number) => Promise<{ success: boolean; data: void }>;
      };
      cliente: {
        create: (data: Partial<Cliente>) => Promise<{ success: boolean; data: number }>;
        readAll: () => Promise<{ success: boolean; data: Cliente[] }>;
        readById: (id: number) => Promise<{ success: boolean; data: Cliente | undefined }>;
        update: (id: number, data: Partial<Cliente>) => Promise<{ success: boolean; data: void }>;
        delete: (id: number) => Promise<{ success: boolean; data: void }>;
      };
      activity: {
        create: (data: Partial<Activity>) => Promise<{ success: boolean; data: number }>;
        readAll: () => Promise<{ success: boolean; data: Activity[] }>;
        readById: (id: number) => Promise<{ success: boolean; data: Activity | undefined }>;
        update: (id: number, data: Partial<Activity>) => Promise<{ success: boolean; data: void }>;
        delete: (id: number) => Promise<{ success: boolean; data: void }>;
      };
    };
  }

    interface Type {
    id: number;
    name: string;
    iconName?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  }

  interface Status {
    id: number;
    position: number;
    iconName?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  }

  interface Cliente {
    id: number;
    name: string;
    iconBase64?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  }

  interface Activity {
    id: number;
    typeId: number;
    priority: number;
    title: string;
    description?: string;
    statusId: number;
    clientId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  }
}