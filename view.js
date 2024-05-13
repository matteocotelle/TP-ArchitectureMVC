// notion abstraction de classe
class TaskRenderer {
    constructor() {
        if (new.target === TaskRenderer) {
            throw new TypeError("Cannot construct TaskRenderer instances directly");
        }
    }

    render(task) {
        throw new Error("Must implement render method");
    }
}

class WorkTaskRenderer extends TaskRenderer {
    render(task) {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.className = 'task-travail';

        return li;
    }
}

class HomeTaskRenderer extends TaskRenderer {
    render(task) {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.className = 'task-maison';
        return li;
    }
}

class OtherTaskRenderer extends TaskRenderer {
    render(task) {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.className = 'task-divers';
        return li;
    }
}

class TaskView {
    constructor() {
        this.taskForm = document.getElementById('taskForm');
        this.taskInput = document.getElementById('taskInput');
        this.taskCategory = document.getElementById('taskCategory');
        this.tasksList = document.getElementById('tasksList');
    }

    setController(controller) {
        this.controller = controller;
        this.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.taskInput.value.trim() !== '') {
                const taskData = {
                    text: this.taskInput.value,
                    category: this.taskCategory.value
                };
                this.controller.addTask(taskData);
            }
        });
    }

    render(tasks) {
        this.tasksList.innerHTML = '';
        tasks.forEach(task => {
            let renderer;
            switch (task.category) {
                case 'travail':
                    renderer = new WorkTaskRenderer(this.controller); // Passer le controller ici
                    break;
                case 'maison':
                    renderer = new HomeTaskRenderer(this.controller);
                    break;
                case 'divers':
                    renderer = new OtherTaskRenderer(this.controller);
                    break;
                default:
                    renderer = new OtherTaskRenderer(this.controller);
            }
            this.tasksList.appendChild(renderer.render(task));
        });
    }
    
}
