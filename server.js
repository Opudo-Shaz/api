const express = require('express');
const pool = require('./connection');
const path = require('path');
const app = express();

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// --- API routes  ---

app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).send('Server error');
  }
});

app.post('/api/items', async (req, res) => {
  const { name, description, price, in_stock } = req.body;

  if (!name || price == null) {
    return res.status(400).send('Name and price are required');
  }

  try {
    const result = await pool.query(
      `INSERT INTO items (name, description, price, in_stock)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, description, price, in_stock ?? true]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding item:', err);
    res.status(500).send('Server error');
  }
});

app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, in_stock } = req.body;

  try {
    const result = await pool.query(
      `UPDATE items SET name = $1, description = $2, price = $3, in_stock = $4
       WHERE id = $5 RETURNING *`,
      [name, description, price, in_stock, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send('Item not found');
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).send('Server error');
  }
});

app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM items WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).send('Item not found');
    }

    res.send(`Item with ID ${id} deleted`);
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).send('Server error');
  }
});


app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
