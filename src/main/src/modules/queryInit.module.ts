export function mainsql() {  
  return `  
CREATE TABLE IF NOT EXISTS note (  
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    title TEXT NOT NULL,  
    content TEXT,  
    folderId INTEGER,  
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,  
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,  
    deletedAt TEXT,  
    FOREIGN KEY (folderId) REFERENCES folder(id)  
);  

CREATE TABLE IF NOT EXISTS task (  
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    title TEXT NOT NULL,  
    description TEXT,  
    kanbanColumnId INTEGER NOT NULL,  
    folderId INTEGER,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
    completedAt TEXT,
    deletedAt TEXT,
    FOREIGN KEY (kanbanColumnId) REFERENCES kanbanColumn(id),
    FOREIGN KEY (folderId) REFERENCES folder(id)
);

CREATE TABLE IF NOT EXISTS kanbanColumn (  
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    name TEXT NOT NULL,  
    position INTEGER NOT NULL DEFAULT 0,  
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,  
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,  
    deletedAt TEXT  
);  

CREATE TABLE IF NOT EXISTS folder (  
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    name TEXT NOT NULL,  
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,  
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,  
    deletedAt TEXT  
);  

CREATE TABLE IF NOT EXISTS attachment (  
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    filename TEXT NOT NULL,  
    link TEXT NOT NULL,  
    kanbanColumnId INTEGER,  
    noteId INTEGER,  
    taskId INTEGER,  
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,  
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,  
    deletedAt TEXT,  
    FOREIGN KEY (kanbanColumnId) REFERENCES kanbanColumn(id),  
    FOREIGN KEY (noteId) REFERENCES note(id),  
    FOREIGN KEY (taskId) REFERENCES task(id)  
);  

CREATE TABLE IF NOT EXISTS password (  
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    folderId INTEGER NOT NULL,  
    encryptedPassword TEXT NOT NULL,  
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,  
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,  
    deletedAt TEXT,  
    FOREIGN KEY (folderId) REFERENCES folder(id)
);

ALTER TABLE IF NOT EXISTS task ADD COLUMN completedAt TEXT;
`  
}