


class Todo {
    constructor(title){
        this.id = Date.now();
        this.title = title;
        this.isCompleted = false;
    } 
}

class App{

    static getTodos(){
        const getStoredTodos = [];
        getStoredTodos.forEach(todo => App.addListOfTodos(todo));
    }

    static addListOfTodos(todo){

        if(typeof todo === 'undefined'){
            return null;
        } 
        console.log(todo);
        const checked = todo.isCompleted ? "unchecked" : "checked";
        const todoSection = document.getElementsByClassName('todo-list')[0];

        let todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
        let newTodo = document.createElement('ul');
        newTodo.classList.add('new-todo');
    
        let todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.setAttribute('data-key', `${todo.id}`);
        todoItem.innerHTML = ``;
        todoItem.innerHTML = 
        `
        <input type="checkbox" class="check-todo-btn" ${checked}>
        <span class="todo-title">${todo.title}</span>
        <button class="delete-todo-btn"><i class="far fa-trash-alt"></i></button>
        `;

        if(todo.isCompleted === true){
            todoItem.classList.add('is-checked');
        }
    
        todoDiv.appendChild(newTodo);
        newTodo.appendChild(todoItem);    
        todoSection.appendChild(todoDiv);
    }
}

document.addEventListener('DOMContentLoaded', App.getTodos);


todoForm.addEventListener('submit', e => {

    e.preventDefault();
    
    //get form input value to retrieve the title
    const title = document.getElementById('insert-todo').value;
    
    //instantiate a Todo
    const todo = new Todo(title);

    App.addListOfTodos(todo);
    
}, false);


function addTodos(item){

    //if whatever we insert does NOT equal an empty string
    if(item !== ""){

        const todo = new Todo(title);

        //call set local todos and pass in the todo obj
        // setLocalTodos(todo_List);

        //clear input
        todoInput.value = ""; 
    }
}



function getFilteredTodos(e){
    let the_option = e.target.value.toLowerCase();
    switch(the_option){
        case 'all':
            console.log(the_option, 'selected');
            break;
        case 'checked':
            console.log(the_option, 'selected');
            break;
        case 'unchecked':
            console.log(the_option, 'selected');
            break;
    }

    return the_option;

}
