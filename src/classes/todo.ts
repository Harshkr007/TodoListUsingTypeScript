export class Todo {
    id: number;
    title: string;
    time:string;
    completed: boolean;

    constructor(obj : {id: number, title: string, time:string}) {
        this.id = obj.id;
        this.title = obj.title;
        this.time = obj.time;
        this.completed = false;
    }

}