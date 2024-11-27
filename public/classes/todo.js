export class Todo {
    constructor(obj) {
        this.id = obj.id;
        this.title = obj.title;
        this.time = obj.time;
        this.completed = false;
    }
}
