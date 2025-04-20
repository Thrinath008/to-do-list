import React, { useEffect, useState } from "react";

function App() {
  const [task, settask] = useState('');
  const [tasks, settasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then(res => res.json())
      .then(data => settasks(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title: task }),
      })
        .then(res => res.json())
        .then(newTask => {
          settasks([...tasks, newTask]);
          settask('');
        })
        .catch(err => console.error(err));
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        settasks(tasks.filter(task => task.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>hello this is a to-do-app made using react</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => settask(e.target.value)}
          placeholder="enter the new task" />
        <button type="submit">add task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => handleDelete(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
