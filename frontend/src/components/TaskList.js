// frontend/src/components/TaskList.js
import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, fetchTasks }) => {
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          {task.name} - {task.dueDate}
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
