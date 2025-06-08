export {}

declare global {
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
