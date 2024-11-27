import { Todo } from "./classes/todo.js";
import { TodoItem } from "./classes/todoItem.js";

// Initialize handlers
let handleCreateTodo: (a: string, b: string) => void;
let handleDeleteTodo: (a: string) => void;
let handlemarkTodo: (a: string) => void;

// Get DOM elements with type safety
const form = document.querySelector(".form") as HTMLFormElement;
const todoInput = document.querySelector("#todo") as HTMLInputElement;
const timeInput = document.querySelector("#time") as HTMLInputElement;
const todoContainer = document.querySelector(".todo-container") as HTMLDivElement;

// Load existing todos on page load
document.addEventListener('DOMContentLoaded', () => {
    loadExistingTodos();
});

function loadExistingTodos() {
    try {
        const todos = JSON.parse(localStorage.getItem("todos") || "[]");
        todoContainer.innerHTML = '';
        todos.forEach((todo: Todo) => {
            renderTodoItem(todo);
        });
    } catch (error) {
        console.error('Error loading todos:', error);
    }
}

function renderTodoItem(todo: Todo) {
    const div = document.createElement("div");
    div.setAttribute('data-id', todo.id.toString());
    div.classList.add("todo-item");
    if (todo.completed) {
        div.classList.add("completed");
    }
    
    div.innerHTML = `
        <div class="todo-checkbox ${todo.completed ? 'checked' : ''}">
            <div class="checkmark">
                ${todo.completed ? '<img src="Image/checkMark.png" alt="checkmark">' : ''}
            </div>
        </div>
        <div class="todo-text">${todo.title}</div>
        <div class="todo-time">${todo.time}</div>
        <div class="todo-actions">
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
        </div>`;
    
    todoContainer.appendChild(div);
}

// Form submission handler
form.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    
    const todoValue = todoInput.value.trim();
    const timeValue = timeInput.value.trim();
    
    if (todoValue && timeValue) {
        handleCreateTodo(todoValue, timeValue);
        todoInput.value = "";
        timeInput.value = "";
    }
});

// Create todo handler
handleCreateTodo = (todoText: string, timeValue: string) => {
    try {
        const newTodo = new Todo({
            id: Date.now(),
            title: todoText,
            time: timeValue
        });

        const todoItem = new TodoItem(newTodo);
        todoItem.setTodo();
        renderTodoItem(newTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
    }
};

// Event delegation for todo actions
todoContainer.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    const todoItem = target.closest('.todo-item');
    const todoId = todoItem?.getAttribute('data-id');

    if (!todoId) return;

    if (target.classList.contains('delete-btn')) {
        handleDeleteTodo(todoId);
    } else if (target.classList.contains('complete-btn') || target.classList.contains('todo-checkbox')) {
        handlemarkTodo(todoId);
    }
});

// Delete todo handler
handleDeleteTodo = (id: string) => {
    try {
        const todos = JSON.parse(localStorage.getItem("todos") || "[]");
        const updatedTodos = todos.filter((todo: Todo) => todo.id !== parseInt(id));
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        if (todoElement) {
            todoElement.remove();
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
};

// Mark todo handler
handlemarkTodo = (id: string) => {
    try {
        const todos = JSON.parse(localStorage.getItem("todos") || "[]");
        const updatedTodos = todos.map((todo: Todo) => {
            if (todo.id === parseInt(id)) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        if (todoElement) {
            todoElement.classList.toggle('completed');
            const checkbox = todoElement.querySelector('.todo-checkbox');
            if (checkbox) {
                checkbox.classList.toggle('checked');
                const checkmark = checkbox.querySelector('.checkmark');
                if (checkmark) {
                    if (checkbox.classList.contains('checked')) {
                        checkmark.innerHTML = '<img src="Image/checkMark.png" alt="checkmark">';
                    } else {
                        checkmark.innerHTML = '';
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error marking todo:', error);
    }
};
