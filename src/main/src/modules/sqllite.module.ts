import Database from 'better-sqlite3';
import {  existsSync, mkdirSync } from 'fs';
import * as path from 'path';
import { app } from 'electron';

class SQLiteDB {
  private db: Database.Database;

  constructor() {
    const dbPath = path.join(app.getPath('userData'), 'app.db');

    const dbDir = path.dirname(dbPath);
    if (!existsSync(dbDir)) {
      mkdirSync(dbDir, { recursive: true });
    }
    this.db = new Database(dbPath);
  }

runQuery<T = any>(sql: string, params?: any[]): T[] {
  const stmt = this.db.prepare(sql);
  const hasParams = params && params.length > 0;

  if (sql.trim().toUpperCase().startsWith('SELECT')) {
    return hasParams ? stmt.all(params) as T[] : stmt.all() as T[];
  } else {
    hasParams ? stmt.run(params) : stmt.run();
    return [];
  }
}

  /**
   * Esegue uno script .sql (diviso per statement con `;`)
   */
runSQLScript(sqlScript: string) {
  const statements = sqlScript
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0);

  this.db.transaction(() => {
    for (const stmt of statements) {
      this.db.prepare(stmt).run();
    }
  })();
}


  close() {
    this.db.close();
  }
}

const dbInstance = new SQLiteDB();
export default dbInstance;
