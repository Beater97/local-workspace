import dbInstance from "./sqllite.module";

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

// ✅ CRUD specifici
export const TypeCRUD = {
  create: (data: Partial<Type>) => create<Type>('type', data),
  readAll: () => readAll<Type>('type'),
  readById: (id: number) => readById<Type>('type', id),
  update: (id: number, data: Partial<Type>) => update<Type>('type', id, data),
  delete: (id: number) => softDelete('type', id),
};

export const StatusCRUD = {
  create: (data: Partial<Status>) => create<Status>('status', data),
  readAll: () => readAll<Status>('status'),
  readById: (id: number) => readById<Status>('status', id),
  update: (id: number, data: Partial<Status>) => update<Status>('status', id, data),
  delete: (id: number) => softDelete('status', id),
};

export const ClienteCRUD = {
  create: (data: Partial<Cliente>) => create<Cliente>('cliente', data),
  readAll: () => readAll<Cliente>('cliente'),
  readById: (id: number) => readById<Cliente>('cliente', id),
  update: (id: number, data: Partial<Cliente>) => update<Cliente>('cliente', id, data),
  delete: (id: number) => softDelete('cliente', id),
};

export const ActivityCRUD = {
  create: (data: Partial<Activity>) => create<Activity>('activity', data),
  readAll: () => readAll<Activity>('activity'),
  readById: (id: number) => readById<Activity>('activity', id),
  update: (id: number, data: Partial<Activity>) => update<Activity>('activity', id, data),
  delete: (id: number) => softDelete('activity', id),
};
