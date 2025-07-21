const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/items', (req, res) => {
  res.send('List of items');
});

app.post('/api/items', (req, res) => {
   const newItem = req.body;
  if (!newItem.name) {
    return res.status(400).send('Item name is required');
  }
  res.status(201).send(`Item ${newItem.name} created`);
});

app.put('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  if (!itemId || !updatedItem.name) {
    return res.status(400).send('Item ID and name are required');
  }
  res.send(`Item with ID ${itemId} updated to ${updatedItem.name}`);
});


app.delete('/api/items/:id', (req, res) => {
  const itemId = req.params.id;
  if (!itemId) {
    return res.status(400).send('Item ID is required');
  }
  res.send(`Item with ID ${itemId} deleted`);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
