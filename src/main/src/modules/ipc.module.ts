import { ipcMain } from 'electron';
import { TypeCRUD, StatusCRUD, ClienteCRUD, ActivityCRUD } from './crud.module';

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

// 📦 Type
handleIpc<[Partial<Type>], number>('type:create', (data) => TypeCRUD.create(data));
handleIpc<[], Type[]>('type:readAll', () => TypeCRUD.readAll());
handleIpc<[number], Type | undefined>('type:readById', (id) => TypeCRUD.readById(id));
handleIpc<[number, Partial<Type>], void>('type:update', (id, data) => TypeCRUD.update(id, data));
handleIpc<[number], void>('type:delete', (id) => TypeCRUD.delete(id));

// 📦 Status
handleIpc<[Partial<Status>], number>('status:create', (data) => StatusCRUD.create(data));
handleIpc<[], Status[]>('status:readAll', () => StatusCRUD.readAll());
handleIpc<[number], Status | undefined>('status:readById', (id) => StatusCRUD.readById(id));
handleIpc<[number, Partial<Status>], void>('status:update', (id, data) => StatusCRUD.update(id, data));
handleIpc<[number], void>('status:delete', (id) => StatusCRUD.delete(id));

// 📦 Cliente
handleIpc<[Partial<Cliente>], number>('cliente:create', (data) => ClienteCRUD.create(data));
handleIpc<[], Cliente[]>('cliente:readAll', () => ClienteCRUD.readAll());
handleIpc<[number], Cliente | undefined>('cliente:readById', (id) => ClienteCRUD.readById(id));
handleIpc<[number, Partial<Cliente>], void>('cliente:update', (id, data) => ClienteCRUD.update(id, data));
handleIpc<[number], void>('cliente:delete', (id) => ClienteCRUD.delete(id));

// 📦 Activity
handleIpc<[Partial<Activity>], number>('activity:create', (data) => ActivityCRUD.create(data));
handleIpc<[], Activity[]>('activity:readAll', () => ActivityCRUD.readAll());
handleIpc<[number], Activity | undefined>('activity:readById', (id) => ActivityCRUD.readById(id));
handleIpc<[number, Partial<Activity>], void>('activity:update', (id, data) => ActivityCRUD.update(id, data));
handleIpc<[number], void>('activity:delete', (id) => ActivityCRUD.delete(id));

console.log('🚀 IPC Module: tutti i canali IPC sono stati registrati!');
