const { readFromJsonFile, writeToJsonFile } = require('../helper/file.helper');

class TodoModle{
    filePath='./data/todos.json'
    todos=null

    constructor(){
      this.todos=readFromJsonFile(this.filePath);

    }

    getAll(){
        return this.todos;
    }
   findOne(id){
       return this.todos.find(todo => todo.id === parseInt(id))
   }
   createTodo(data){
        this.todos.push(data);
        writeToJsonFile(this.filePath,this.todos);
   }
   updateTodo(id,data){
        this.todos.map(todo=>{
            if (todo.id===parseInt(id)){
                todo.title=data?.title || todo.title;
                todo.isCompleted=data?.isCompleted || todo.isCompleted;

            }
        })
       writeToJsonFile(this.filePath,this.todos);
   }
   deleteTodo(id){
       const todoIndex = this.todos.findIndex(todo => todo.id === parseInt(id));

       this.todos.splice(todoIndex, 1);
       writeToJsonFile(this.filePath,this.todos);

   }
}
module.exports=TodoModle;