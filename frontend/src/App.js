// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    const newTask = { name, dueDate };
    await axios.post('http://localhost:5000/tasks', newTask);
    setName('');
    setDueDate('');
    fetchTasks();
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
};

export default App;
