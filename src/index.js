const express = require('express');
const app = express();

app.use(express.json());

let todos = [];
let nextId = 1;

// Welcome
app.get('/', (req, res) => {
  res.json({ message: 'Minimal Todo backend with Express' });
});

// List todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Get todo by id
app.get('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Not found' });
  res.json(todo);
});

// Create todo
app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required and must be a string' });
  }
  const todo = { id: nextId++, title: title.trim(), completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// Update todo
app.put('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Not found' });

  const { title, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string') return res.status(400).json({ error: 'title must be a string' });
    todo.title = title.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== 'boolean') return res.status(400).json({ error: 'completed must be boolean' });
    todo.completed = completed;
  }

  res.json(todo);
});

// Delete todo
app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const [removed] = todos.splice(idx, 1);
  res.json(removed);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Todo API listening on http://localhost:${port}`);
});
