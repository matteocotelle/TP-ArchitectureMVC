class TaskController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.setController(this);
        this.currentFilter = 'all';


        document.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', () => {
                this.currentFilter = button.getAttribute('data-filter');
                this.filterTasks();
            });
        });

        this.view.render(this.model.tasks);
    }

    addTask(taskData) {
        console.log("controller ", taskData.text, taskData.category);
        if (taskData.text) {
            this.model.addTask(taskData);
            this.filterTasks();  
        }
    }

    deleteTask(task) {
        this.model.tasks = this.model.tasks.filter(t => t !== task);
        this.filterTasks();  
    }

    filterTasks() {
        if (this.currentFilter === 'all') {
            this.view.render(this.model.tasks);
        } else {
            const filteredTasks = this.model.tasks.filter(task => task.category === this.currentFilter);
            this.view.render(filteredTasks);
        }
    }
}

const model = TaskModel.getInstance();
const view = new TaskView();
const app = new TaskController(model, view);
