export class Task {
    public taskId: number;
    public name: string;
    public description: string;
    public creationDate: Date;
    public dueDate: Date;
    public complete: boolean;

    constructor(id: number, name: string, description: string, creationDate: Date, dueDate: Date, complete: boolean) {
        this.taskId = id;
        this.name = name;
        this.description = description;
        this.creationDate = creationDate;
        this.dueDate = dueDate;
        this.complete = complete;
    }
}

export type NewTaskRequest = {
    name: string,
    description: string,
    dueDate?: Date
}

export type UpdateTaskRequest = {
    taskId: number;
    name: string;
    description: string;
    dueDate?: Date;
    complete: boolean;
}