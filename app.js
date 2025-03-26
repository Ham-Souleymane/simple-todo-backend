const express = require('express');
const { readFromJsonFile, writeToJsonFile } = require('./helper/file.helper');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to save todos to the file
const save = (req, res, next) => {
    try {
        writeToJsonFile('./data/todos.json', todos);

        next();
    } catch (err) {
        console.error('Error saving todos:', err);
        res.status(500).json({ message: 'Internal Server Error: Could not save todos' });
    }
};

// Load todos from file
let todos = [];
try {
    todos = readFromJsonFile('./data/todos.json');
} catch (err) {
    console.error('Error reading todos data:', err);
}

// Route to get all todos
app.get('/todos', (req, res) => {
    res.status(200).json({
        message: 'Fetch all todos successfully',
        data: todos
    });
});

// Route to get a todo by ID
app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo found', data: todo });
});

// Route to create a new todo
app.post('/todos', (req, res, next) => {
    const title = req.body.title;
    if (!title) {
        return res.status(400).json({ message: 'Please provide a title' });
    }
    const newTodo = {
        id: Date.now().toString(),
        title,
        isCompleted: false
    };
    todos.push(newTodo);
    res.status(201).json({
        message: 'Todo created successfully',
        data: newTodo
    });
    next();
}, save);

// Route to update todo by ID
app.put('/todos/:id', (req, res, next) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    const { title, isCompleted } = req.body;
    if (title) todo.title = title;
    if (typeof isCompleted === 'boolean') todo.isCompleted = isCompleted;

    res.status(200).json({
        message: 'Todo updated successfully',
        data: todo
    });
    next();
}, save);

// Route to delete a todo by ID
app.delete('/todos/:id', (req, res, next) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos.splice(todoIndex, 1);
    res.status(200).json({ message: 'Todo deleted successfully' });
    next();
}, save);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});