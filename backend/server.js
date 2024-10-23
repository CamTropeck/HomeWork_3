// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb+srv://camerontropeck:Highjumper2004@cluster0.5qfun.mongodb.net/todo_app?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.post('/tasks', async (req, res) => {
  try {
    const { name, dueDate } = req.body;
    const newTask = new Task({ name, dueDate });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Error adding task' });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dueDate } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { name, dueDate }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
