const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- REST API ENDPOINTS FOR 'recipes' ---

// 1. GET /api/recipes - List all records
app.get('/api/recipes', (req, res) => {
  const sql = 'SELECT * FROM recipes ORDER BY id DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// 2. GET /api/recipes/:id - Get one record
app.get('/api/recipes/:id', (req, res) => {
  const sql = 'SELECT * FROM recipes WHERE id = ?';
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(row);
  });
});

// 3. POST /api/recipes - Create a record
app.post('/api/recipes', (req, res) => {
  const { title, category, prep_time_mins, difficulty, instructions } = req.body;
  if (!title || !category) {
    return res.status(400).json({ error: 'Title and category are required' });
  }

  const sql = `INSERT INTO recipes (title, category, prep_time_mins, difficulty, instructions) VALUES (?, ?, ?, ?, ?)`;
  const params = [title, category, prep_time_mins || 0, difficulty || 'Easy', instructions || ''];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: this.lastID,
      title,
      category,
      prep_time_mins,
      difficulty,
      instructions
    });
  });
});

// 4. PUT /api/recipes/:id - Update a record
app.put('/api/recipes/:id', (req, res) => {
  const { title, category, prep_time_mins, difficulty, instructions } = req.body;
  const sql = `UPDATE recipes SET title = ?, category = ?, prep_time_mins = ?, difficulty = ?, instructions = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  const params = [title, category, prep_time_mins, difficulty, instructions, req.params.id];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json({ message: 'Recipe updated successfully', id: req.params.id });
  });
});

// 5. DELETE /api/recipes/:id - Delete a record
app.delete('/api/recipes/:id', (req, res) => {
  const sql = 'DELETE FROM recipes WHERE id = ?';
  db.run(sql, [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully', id: req.params.id });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
