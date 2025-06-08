import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      note: {
        create: (data: Partial<Note>) => Promise<{ success: boolean; data: number }>
        readAll: () => Promise<{ success: boolean; data: Note[] }>
        readById: (id: number) => Promise<{ success: boolean; data: Note | undefined }>
        update: (id: number, data: Partial<Note>) => Promise<{ success: boolean; data: void }>
        delete: (id: number) => Promise<{ success: boolean; data: void }>
      }
      task: {
        create: (data: Partial<Task>) => Promise<{ success: boolean; data: number }>
        readAll: () => Promise<{ success: boolean; data: Task[] }>
        readById: (id: number) => Promise<{ success: boolean; data: Task | undefined }>
        update: (id: number, data: Partial<Task>) => Promise<{ success: boolean; data: void }>
        delete: (id: number) => Promise<{ success: boolean; data: void }>
      }
      kanbanColumn: {
        create: (data: Partial<KanbanColumn>) => Promise<{ success: boolean; data: number }>
        readAll: () => Promise<{ success: boolean; data: KanbanColumn[] }>
        readById: (id: number) => Promise<{ success: boolean; data: KanbanColumn | undefined }>
        update: (
          id: number,
          data: Partial<KanbanColumn>
        ) => Promise<{ success: boolean; data: void }>
        delete: (id: number) => Promise<{ success: boolean; data: void }>
      }
      folder: {
        create: (data: Partial<Folder>) => Promise<{ success: boolean; data: number }>
        readAll: () => Promise<{ success: boolean; data: Folder[] }>
        readById: (id: number) => Promise<{ success: boolean; data: Folder | undefined }>
        update: (id: number, data: Partial<Folder>) => Promise<{ success: boolean; data: void }>
        delete: (id: number) => Promise<{ success: boolean; data: void }>
      }
      attachment: {
        create: (data: Partial<Attachment>) => Promise<{ success: boolean; data: number }>
        readAll: () => Promise<{ success: boolean; data: Attachment[] }>
        readById: (id: number) => Promise<{ success: boolean; data: Attachment | undefined }>
        update: (id: number, data: Partial<Attachment>) => Promise<{ success: boolean; data: void }>
        delete: (id: number) => Promise<{ success: boolean; data: void }>
      }
      password: {
        create: (data: Partial<Password>) => Promise<{ success: boolean; data: number }>
        readAll: () => Promise<{ success: boolean; data: Password[] }>
        readById: (id: number) => Promise<{ success: boolean; data: Password | undefined }>
        update: (id: number, data: Partial<Password>) => Promise<{ success: boolean; data: void }>
        delete: (id: number) => Promise<{ success: boolean; data: void }>
      }
    }
  }
  interface Note {
    id: number
    title: string
    content?: string
    folderId?: number
    createdAt: string
    updatedAt: string
    deletedAt?: string
  }

  interface Task {
    id: number
    title: string
    description?: string
    kanbanColumnId: number
    folderId?: number
    createdAt: string
    updatedAt: string
    completedAt?: string
    deletedAt?: string
  }

  interface KanbanColumn {
    id: number
    name: string
    position: number
    createdAt: string
    updatedAt: string
    deletedAt?: string
  }

  interface Folder {
    id: number
    name: string
    createdAt: string
    updatedAt: string
    deletedAt?: string
  }

  interface Attachment {
    id: number
    filename: string
    link: string
    kanbanColumnId?: number
    noteId?: number
    taskId?: number
    createdAt: string
    updatedAt: string
    deletedAt?: string
  }

  interface Password {
    id: number
    folderId: number
    encryptedPassword: string
    createdAt: string
    updatedAt: string
    deletedAt?: string
  }
}
