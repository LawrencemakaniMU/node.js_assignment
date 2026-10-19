const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Connect to SQLite database file (creates database.sqlite if it doesn't exist)
const dbFile = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');

    // Automatically initialize tables and seed records from schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      db.exec(schemaSql, (execErr) => {
        if (execErr) {
          console.error('Error executing schema.sql:', execErr.message);
        } else {
          console.log('Database tables and sample data initialized successfully.');
        }
      });
    }
  }
});

module.exports = db;