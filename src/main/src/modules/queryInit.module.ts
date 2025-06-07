export function mainsql() {
  return `

CREATE TABLE IF NOT EXISTS type (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    iconName TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
    deletedAt TEXT
);

CREATE TABLE IF NOT EXISTS status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    position INTEGER NOT NULL DEFAULT 0,
    iconName TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
    deletedAt TEXT
);

CREATE TABLE IF NOT EXISTS cliente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    iconBase64 TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
    deletedAt TEXT
);

CREATE TABLE IF NOT EXISTS activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    typeId INTEGER NOT NULL,
    priority INTEGER DEFAULT 0,
    title TEXT NOT NULL,
    description TEXT,
    statusId INTEGER NOT NULL,
    clientId INTEGER NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
    deletedAt TEXT,
    FOREIGN KEY (typeId) REFERENCES type(id),
    FOREIGN KEY (statusId) REFERENCES status(id),
    FOREIGN KEY (clientId) REFERENCES cliente(id)
);

CREATE INDEX IF NOT EXISTS idx_activity_typeId ON activity(typeId);
CREATE INDEX IF NOT EXISTS idx_activity_statusId ON activity(statusId);
CREATE INDEX IF NOT EXISTS idx_activity_clientId ON activity(clientId);

`
}
