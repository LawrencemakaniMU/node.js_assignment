const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database file (creates database.sqlite if it doesn't exist)
const dbFile = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db;
