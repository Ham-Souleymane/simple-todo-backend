const {Router} = require('express');
const TodoController=require('./controllers/todo.controller')
const { readFromJsonFile, writeToJsonFile } = require('./helper/file.helper');
const router = new Router();
// Middleware to saveTodo todos to the file


// Load todos from file
let todos = [];
try {
    todos = readFromJsonFile('./data/todos.json');
} catch (err) {
    console.error('Error reading todos data:', err);
}

// Route to get all todos
router.get('/todos', TodoController.getTodos);

// Route to get a todo by ID
router.get('/todos/:id', TodoController.getTodosById);

// Route to create a new todo
router.post('/todos', TodoController.createTodo);

// Route to update todo by ID
router.put('/todos/:id', TodoController.updateTodo);

// Route to delete a todo by ID
router.delete('/todos/:id', TodoController.deleteTodo);

module.exports = router;
