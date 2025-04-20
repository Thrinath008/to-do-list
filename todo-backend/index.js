const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { title } = require('process');


const app = express();
const PORT = 3000;

const DATA_FILE = './tasks.json';
let tasks = [];


if (fs.existsSync(DATA_FILE)){
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    tasks = JSON.parse(data || '[]');
}

app.get('/tasks',(req, res) =>{
    res.json(tasks);
});

app.post('/tasks', (req, res) =>{
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        completed: false,
    };
    tasks.push(newTask);
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null,2));
    res.status(201).json(newTask);
});

app.delete('/tasks', (req, res) =>{
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
    res.status(200).json({message: 'task have been deleted'});
});

app.listen(PORT, ()=>{
    console.log(`the server has started at port ${PORT}`);
});