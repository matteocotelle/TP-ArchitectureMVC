class BaseTask {
    constructor(text) {
        this.text = text;
    }
}

//notion d'heritage de
class Task extends BaseTask {
    constructor(text, category) {
        super(text);
        this.category = category;
    }
}

class TaskModel {
    constructor() {
        if (TaskModel.instance) {
            return TaskModel.instance;
        }
        this.tasks = [];
        TaskModel.instance = this;
    }

    addTask(taskData) {
        const task = new Task(taskData.text, taskData.category);
        console.log("model ", taskData.text, taskData.category);
        this.tasks.push(task);
    }

    //notion Singleton
    static getInstance() {
        if (!TaskModel.instance) {
            TaskModel.instance = new TaskModel();
        }
        return TaskModel.instance;
    }
}
