const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/items', (req, res) => {
    res.send('List of items');
});

app.post('/api/items', (req, res) => {
    const newItem = req.body;
    res.send(`Item added: ${newItem.name}`);
});
app.put('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;
    res.send(`Item ${itemId} updated with name: ${updatedItem.name}`);
});

app.delete('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    res.send(`Item ${itemId} deleted`);
});

app.listen(3000, () => 
  console.log('Server is running on port 3000'));

