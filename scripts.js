
class Todo {
    constructor(title){
        this.id = Date.now();
        this.title = title;
        this.isCompleted = false;
    } 
}

class Store{
    static filterLocalTodos(todos, value){
        JSON.parse(localStorage.getItem('filteredOption') || '[]');

        switch(value){

            case "All":
                    todos.style.display = "flex";
                    localStorage.setItem("filteredOption", JSON.stringify(value));
                break;
            case "Checked":
                if(todos.classList.contains('is-completed')){
                    todos.style.display = "flex";
                } else {
                    todos.style.display = "none";
                }
                localStorage.setItem("filteredOption", JSON.stringify(value));

                break;
            case "Unchecked":
                if(!todos.classList.contains('is-completed')){
                    todos.style.display = "flex";
                } else {
                    todos.style.display = "none";
                }
                localStorage.setItem("filteredOption", JSON.stringify(value));
                break;  
        }

    }

    static getLocalTodos(){
        
        let todos;

        if(localStorage.getItem("todos") === null){
            todos = [];
        }
        else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }

        return todos;

    }
    
    static addLocalTodos(todo){
        const todos = Store.getLocalTodos();

        todos.push(todo);

        localStorage.setItem("todos", JSON.stringify(todos));
    }

    static removeLocalTodo(id){

        const todos = Store.getLocalTodos();
        todos.forEach((todo, index) => {
            if(todo.id == id){
                todos.splice(index, 1);
            }
        });

        localStorage.setItem("todos", JSON.stringify(todos));
    }

    static checkLocalTodos(id){

        const todos = Store.getLocalTodos();

        todos.forEach(todo => {
            if(todo.id == id){
                todo.isCompleted = !todo.isCompleted;
            }
        });

        localStorage.setItem("todos", JSON.stringify(todos));

    }    

}

class UI{

    static getTodos(select){
        const getStoredTodos = Store.getLocalTodos();
        const getListedFromStorage = JSON.parse(localStorage.getItem('filteredOption'));
        const filteredTodos = document.getElementsByClassName('todo-item');

        getStoredTodos.forEach(todo => UI.addListOfTodos(todo));
        for(let f = 0; f < filteredTodos.length; f++){
        switch(getListedFromStorage){
            case "All":
                select.value = "All";
                filteredTodos[f].style.display = "flex";
                break;
            case "Checked":
                select.value = "Checked";
                if(filteredTodos[f].classList.contains("is-completed")){
                    filteredTodos[f].style.display = "flex";
                } else {
                    filteredTodos[f].style.display = "none";
                }
                break;
            case "Unchecked":
                select.value = "Unchecked";
                if(!filteredTodos[f].classList.contains("is-completed")){
                    filteredTodos[f].style.display = "flex";
                } else {
                    filteredTodos[f].style.display = "none";
                }
                break;
        }
        }
        

    }
    

    static filterTodos(e){
        const todoList = document.getElementsByClassName('todo-item');

        for(let t = 0; t < todoList.length; t++){
        Store.filterLocalTodos(todoList[t], e.target.value);
        }
    }


    static checkTodos(todo, id, todoItem, checkboxes){

        if(todo.id == id){

            todo.isCompleted = !todo.isCompleted;
            if(todo.isCompleted === true){
                todoItem.classList.add('is-completed');
                checkboxes.setAttribute('checked', true);
            } else {
                todoItem.classList.remove('is-completed');
                checkboxes.removeAttribute('checked');
            }
            
            //check Todo from Local Storage
            Store.checkLocalTodos(id);
        }

    }

    static toggleUI(item, li){
        let chkbox = li.getElementsByClassName('check-todo-btn')[0];

        if(item.isCompleted === true){
            li.classList.add('is-completed');
            chkbox.setAttribute('checked', true);
            chkbox.checked = true;
        } else {
            chkbox.checked = false;
        }

    }

    static deleteTodos(todo){
            const getTodoDiv = todo.parentElement.parentElement.parentElement;
            getTodoDiv.classList.add('fall');
            getTodoDiv.addEventListener('transitionend', (e) => {
                e.target.remove();
            });
            console.log(todo);
        
    }

    static addListOfTodos(item){

        const todoSection = document.getElementsByClassName('todo-list')[0];

        let todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        let newTodo = document.createElement('ul');
        newTodo.classList.add('new-todo');

        let todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.setAttribute('data-key', `${item.id}`);

        //grab the checkbox
        let checkboxes = document.getElementsByClassName("check-todo-btn");
        
        //get checkboxes length
        let itemCount = checkboxes.length + 1;

        todoItem.innerHTML = 
        `
        <div class="toggle">

        <input type="checkbox" id="item-${itemCount}" class="check-todo-btn">
        <label for="item-${itemCount}"><span>Toggle</span></label>
        </div>
        <span class="todo-title">${item.title}</span>
        <button class="delete-todo-btn"><span class="material-icons-outlined">
        delete_outline
        </span></button>
        `;
        
        todoDiv.appendChild(newTodo);
        newTodo.appendChild(todoItem);    
        todoSection.appendChild(todoDiv);

        
        UI.toggleUI(item, todoItem);
        
            
        const todos = document.getElementsByClassName('todo-item');

        for(let i = 0; i < todos.length; i++ ){

            todos[i].addEventListener('click', e => {
                
                if(e.target.type === "checkbox" && e.target.classList.contains("check-todo-btn")){

                    const todoLi = e.target.parentElement.parentElement;
                    const todoId = todoLi.getAttribute('data-key');

                    UI.checkTodos(item, todoId, todoLi, e.target);                    
                    
                }

                if(e.target.classList.contains('delete-todo-btn')){
                    
                    const todoId = e.target.parentElement.getAttribute('data-key');
                    //delete Todo from UI.
                    UI.deleteTodos(e.target);     

                    //delete Todo from Local Storage
                    Store.removeLocalTodo(todoId);

                }

            });
        
        }
            
    }

    static clearTodoInput(input){
        //clear input field (not the title)
        input.value = '';
    }

}

const theForm = document.getElementById('todoForm');
const selectField = document.getElementById('show-todos');
selectField.addEventListener('change', UI.filterTodos);

document.addEventListener('DOMContentLoaded', UI.getTodos(selectField));


todoForm.addEventListener('submit', e => {

e.preventDefault();

//get form input value  to retrieve the title
const input = document.getElementById('insert-todo');

const title = input.value;

    if(title !== ""){

        //instantiate a Todo
        const todos = new Todo(title); 
        
        //add Todo To UI
        UI.addListOfTodos(todos);

    
        //add Todo to local storage
        Store.addLocalTodos(todos); 
        
        //call method to clear input
        UI.clearTodoInput(input);

    } else {
        alert("Please fill out all fields");
    }
    

});