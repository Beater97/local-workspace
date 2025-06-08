import dbInstance from './sqllite.module'



// 🔥 CRUD generici
function create<T>(table: string, data: Partial<T>): number {
  const keys = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);

  const sql = `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`;
  dbInstance.runQuery(sql, values);
  return (dbInstance.runQuery('SELECT last_insert_rowid() as id')[0] as any).id;
}

function readAll<T>(table: string): T[] {
  const sql = `SELECT * FROM ${table} WHERE deletedAt IS NULL`;
  return dbInstance.runQuery<T>(sql);
}

function readById<T>(table: string, id: number): T | undefined {
  const sql = `SELECT * FROM ${table} WHERE id = ? AND deletedAt IS NULL`;
  const result = dbInstance.runQuery<T>(sql, [id]);
  return result[0];
}

function update<T>(table: string, id: number, data: Partial<T>): void {
  const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(data), id];

  const sql = `UPDATE ${table} SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`;
  dbInstance.runQuery(sql, values);
}

function softDelete(table: string, id: number): void {
  const sql = `UPDATE ${table} SET deletedAt = CURRENT_TIMESTAMP WHERE id = ?`;
  dbInstance.runQuery(sql, [id]);
}
export const NoteCRUD = {
  create: (data: Partial<Note>) => create<Note>('note', data),
  readAll: () => readAll<Note>('note'),
  readById: (id: number) => readById<Note>('note', id),
  update: (id: number, data: Partial<Note>) => update<Note>('note', id, data),
  delete: (id: number) => softDelete('note', id),
};

export const TaskCRUD = {
  create: (data: Partial<Task>) => create<Task>('task', data),
  readAll: () => readAll<Task>('task'),
  readById: (id: number) => readById<Task>('task', id),
  update: (id: number, data: Partial<Task>) => update<Task>('task', id, data),
  delete: (id: number) => softDelete('task', id),
};

export const KanbanColumnCRUD = {
  create: (data: Partial<KanbanColumn>) => create<KanbanColumn>('kanbanColumn', data),
  readAll: () => readAll<KanbanColumn>('kanbanColumn'),
  readById: (id: number) => readById<KanbanColumn>('kanbanColumn', id),
  update: (id: number, data: Partial<KanbanColumn>) => update<KanbanColumn>('kanbanColumn', id, data),
  delete: (id: number) => softDelete('kanbanColumn', id),
};

export const FolderCRUD = {
  create: (data: Partial<Folder>) => create<Folder>('folder', data),
  readAll: () => readAll<Folder>('folder'),
  readById: (id: number) => readById<Folder>('folder', id),
  update: (id: number, data: Partial<Folder>) => update<Folder>('folder', id, data),
  delete: (id: number) => softDelete('folder', id),
};

export const AttachmentCRUD = {
  create: (data: Partial<Attachment>) => create<Attachment>('attachment', data),
  readAll: () => readAll<Attachment>('attachment'),
  readById: (id: number) => readById<Attachment>('attachment', id),
  update: (id: number, data: Partial<Attachment>) => update<Attachment>('attachment', id, data),
  delete: (id: number) => softDelete('attachment', id),
};

export const PasswordCRUD = {
  create: (data: Partial<Password>) => create<Password>('password', data),
  readAll: () => readAll<Password>('password'),
  readById: (id: number) => readById<Password>('password', id),
  update: (id: number, data: Partial<Password>) => update<Password>('password', id, data),
  delete: (id: number) => softDelete('password', id),
};
