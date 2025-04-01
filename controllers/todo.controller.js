const {readFromJsonFile, writeToJsonFile} = require("../helper/file.helper");
const TodoModle=require('../models/todo.modle')
const TodoDBModel=require('../models/todo.db.model')
let todos = [];
try {
    todos = new TodoModle();
} catch (err) {
    console.error('Error reading todos data:', err);
}
 const  getTodos= async (req, res) => {
    res.status(200).json({
        message: 'Fetch all todos successfully',
        data: await TodoDBModel.getAll()
    })
}
const getTodosById= async (req, res) => {
    const id = req.params.id;
    const todo = await TodoDBModel.findOne(id);
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo found', data: todo });
}
const createTodo= async (req, res) => {
    const title = req.body.title;
    if (!title) {
        return res.status(400).json({ message: 'Please provide a title' });
    }

  await TodoDBModel.createOne({


      title:title

  })
    res.status(201).json({
        message: 'Todo created successfully',
        data: await TodoDBModel.getAll()
    });

}
const updateTodo= async (req, res) => {
    const id = req.params.id;
    const todo = await TodoDBModel.findOne(id);
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    const { title, isCompleted } = req.body;
    await TodoDBModel.updateOne(id,{...(title?{title:title}:{}),
            ...(isCompleted?{isCompleted:isCompleted}:{}) })

    res.status(200).json({
        message: 'Todo updated successfully',
        data: await TodoDBModel.findOne(id)
    });

}
const deleteTodo= async (req, res) => {
    const id = req.params.id;
    const todo= await TodoDBModel.findOne(id);
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    await TodoDBModel.deleteOne(id);
    res.status(200).json({ message: 'Todo deleted successfully' });

}


module.exports = {
    getTodos,
    getTodosById,
    createTodo,
    updateTodo,
    deleteTodo,

}