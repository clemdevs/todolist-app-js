const todoInput = document.getElementById('insert-todo');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoForm = document.getElementById('todoForm');
const selectTodos = document.getElementById('show-todos');



document.addEventListener('DOMContentLoaded', function(e){
    let todo_List = [];
    getTodos(todo_List);
}, true);


todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodos(todoInput.value);
}, false);

selectTodos.addEventListener('change', function(e){
    e.preventDefault();
    getFilteredTodos(e);
}, false);


function addTodos(item){

    if(item !== ""){
        
        const todo_List =  {
            id: Date.now(),
            name: item,
            isCompleted: false
        }; //our todo object
        
        const blyn = [];

        blyn.push(todo_List);

        storeTodos(blyn);

        todoInput.value = "";
    }
}


function renderTodos(todos){

    todos.forEach(function(todo){
        const checked = todo.isCompleted ? 'checked': 'unchecked';
        
        let todoSection = document.getElementsByClassName('todo-list')[0]; //get the todo section

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
        <span class="todo-title">${todo.name}</span>
        <button class="delete-todo-btn"><i class="far fa-trash-alt"></i></button>
        `;

        
        if(todo.isCompleted === true){
            todoItem.classList.add('is-checked');
        }
    
        todoDiv.appendChild(newTodo);
        newTodo.appendChild(todoItem);    
        todoSection.appendChild(todoDiv);
    })

}

function getTodos(todos){
    const reference = localStorage.getItem('todos');
    if(reference === null){
        localStorage.setItem('todos', JSON.stringify([]));
    } else {
       reference.push(todos);
       JSON.parse(reference);
    }
}

function storeTodos(todos){
    return localStorage.setItem('todos', JSON.stringify(todos));
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
