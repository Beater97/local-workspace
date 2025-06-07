import { ipcMain } from 'electron';
import { AttachmentCRUD, FolderCRUD, KanbanColumnCRUD, NoteCRUD, PasswordCRUD, TaskCRUD } from './crud.module';

// Helper generico con typing per log e risultati
function handleIpc<Args extends any[], Return>(
  channel: string,
  handler: (...args: Args) => Return | Promise<Return>
) {
  ipcMain.handle(channel, async (_event, ...args: Args) => {
    try {
      const result = await handler(...args);
      return { success: true, data: result };
    } catch (error) {
      console.error(`Errore IPC [${channel}]:`, error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  });
}
// 📦 Note
handleIpc<[Partial<Note>], number>('note:create', (data) => NoteCRUD.create(data));
handleIpc<[], Note[]>('note:readAll', () => NoteCRUD.readAll());
handleIpc<[number], Note | undefined>('note:readById', (id) => NoteCRUD.readById(id));
handleIpc<[number, Partial<Note>], void>('note:update', (id, data) => NoteCRUD.update(id, data));
handleIpc<[number], void>('note:delete', (id) => NoteCRUD.delete(id));

// 📦 Task
handleIpc<[Partial<Task>], number>('task:create', (data) => TaskCRUD.create(data));
handleIpc<[], Task[]>('task:readAll', () => TaskCRUD.readAll());
handleIpc<[number], Task | undefined>('task:readById', (id) => TaskCRUD.readById(id));
handleIpc<[number, Partial<Task>], void>('task:update', (id, data) => TaskCRUD.update(id, data));
handleIpc<[number], void>('task:delete', (id) => TaskCRUD.delete(id));

// 📦 KanbanColumn
handleIpc<[Partial<KanbanColumn>], number>('kanbanColumn:create', (data) => KanbanColumnCRUD.create(data));
handleIpc<[], KanbanColumn[]>('kanbanColumn:readAll', () => KanbanColumnCRUD.readAll());
handleIpc<[number], KanbanColumn | undefined>('kanbanColumn:readById', (id) => KanbanColumnCRUD.readById(id));
handleIpc<[number, Partial<KanbanColumn>], void>('kanbanColumn:update', (id, data) => KanbanColumnCRUD.update(id, data));
handleIpc<[number], void>('kanbanColumn:delete', (id) => KanbanColumnCRUD.delete(id));

// 📦 Folder
handleIpc<[Partial<Folder>], number>('folder:create', (data) => FolderCRUD.create(data));
handleIpc<[], Folder[]>('folder:readAll', () => FolderCRUD.readAll());
handleIpc<[number], Folder | undefined>('folder:readById', (id) => FolderCRUD.readById(id));
handleIpc<[number, Partial<Folder>], void>('folder:update', (id, data) => FolderCRUD.update(id, data));
handleIpc<[number], void>('folder:delete', (id) => FolderCRUD.delete(id));

// 📦 Attachment
handleIpc<[Partial<Attachment>], number>('attachment:create', (data) => AttachmentCRUD.create(data));
handleIpc<[], Attachment[]>('attachment:readAll', () => AttachmentCRUD.readAll());
handleIpc<[number], Attachment | undefined>('attachment:readById', (id) => AttachmentCRUD.readById(id));
handleIpc<[number, Partial<Attachment>], void>('attachment:update', (id, data) => AttachmentCRUD.update(id, data));
handleIpc<[number], void>('attachment:delete', (id) => AttachmentCRUD.delete(id));

// 📦 Password
handleIpc<[Partial<Password>], number>('password:create', (data) => PasswordCRUD.create(data));
handleIpc<[], Password[]>('password:readAll', () => PasswordCRUD.readAll());
handleIpc<[number], Password | undefined>('password:readById', (id) => PasswordCRUD.readById(id));
handleIpc<[number, Partial<Password>], void>('password:update', (id, data) => PasswordCRUD.update(id, data));
handleIpc<[number], void>('password:delete', (id) => PasswordCRUD.delete(id));

console.log('🚀 IPC Module: tutti i canali IPC sono stati registrati!');