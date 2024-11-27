import {Todo} from "./todo.js";

export class TodoItem {
  todo: Todo ;
  todos: Todo[] = [];

  constructor(todo: Todo) {
    this.todo = todo;
  }

  setTodo() {
    console.log(this.todo);
    this.todos = JSON.parse(localStorage.getItem("todos") || "[]");

    if (this.todos == null) {
      this.todos = [this.todo];
    } else {
      this.todos.push(this.todo);
    }

    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  getTodo() {
    return this.todos;
  }
}
