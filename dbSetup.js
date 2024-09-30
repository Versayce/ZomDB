const Database = require('better-sqlite3');
const db = new Database('./db/playerData.db', { verbose: console.log });

// Create the playerData table if it doesn't exist
db.prepare(`
    CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        health REAL,
        hunger REAL,
        thirst REAL,
        endurance REAL,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`).run();

module.exports = db;
