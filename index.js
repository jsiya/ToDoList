class Task {
    constructor(taskName, dueDate) {
      this.taskName = taskName;
      this.dueDate = dueDate;
      this.isCompleted = false;
    }
  }
  
  class ToDoList {
    constructor() {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }
  
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  
    addTask(task) {
      this.tasks.push(task);
      this.saveTasks();
    }
  
    removeTask(taskName) {
      this.tasks = this.tasks.filter(task => task.taskName !== taskName);
      this.saveTasks();
    }
  
    updateTask(taskName, newTaskName, newDueDate) {
      const task = this.tasks.find(task => task.taskName === taskName);
      if (task) {
        task.taskName = newTaskName;
        task.dueDate = newDueDate;
        this.saveTasks();
      }
    }
  
    markTaskAsCompleted(taskName) {
      const task = this.tasks.find(task => task.taskName === taskName);
      if (task) {
        if(task.isCompleted){
            task.isCompleted = false;
        }
        else{
            task.isCompleted = true;
        }
        this.saveTasks();
      }
    }
  
    getTasks() {
      return this.tasks;
    }
  }
  
  class TaskManager {
    constructor(todoList) {
      this.todoList = todoList;
    }
  
    createTask(taskName, dueDate) {
      const task = new Task(taskName, dueDate);
      this.todoList.addTask(task);
    }
  
    deleteTask(taskName) {
      this.todoList.removeTask(taskName);
    }
  
    completeTask(taskName) {
      this.todoList.markTaskAsCompleted(taskName);
    }
  
    updateTask(taskName, newTaskName, newDueDate) {
      this.todoList.updateTask(taskName, newTaskName, newDueDate);
    }
  
    getTasks() {
      return this.todoList.getTasks();
    }
  }







const todoList = new ToDoList();
const taskManager = new TaskManager(todoList);


document.addEventListener("DOMContentLoaded", function() {
    renderTasks();
});
  

function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    taskManager.getTasks().forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task");
        if (task.isCompleted) {
            li.classList.add("checked");
        }
        const taskNameParam = document.createElement("p");
        taskNameParam.textContent = task.taskName;
        const dueDateParam = document.createElement("p");
        dueDateParam.classList.add("date-p");
        dueDateParam.textContent = task.dueDate;
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.innerHTML = '<img src="../Asserts/images/trash-xmark.png">';
      

        removeBtn.addEventListener("click", function(event) {
            event.stopPropagation();
            taskManager.deleteTask(task.taskName);
            renderTasks();
        });
      
        li.addEventListener("click", function() {
            if (li.classList.contains("checked")) {
                li.classList.remove("checked");
                taskManager.completeTask(task.taskName, false); 
            } 
            else {
                li.classList.add("checked");
                taskManager.completeTask(task.taskName, true); 
            }
            renderTasks();
        });
      
        li.appendChild(taskNameParam);
        li.appendChild(dueDateParam);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    });
}
  
document.querySelector(".add-btn").addEventListener("click", function() {
    const taskName = document.getElementById("task").value;
    const dueDate = new Date(); 
    if (taskName.trim() !== "") {
        taskManager.createTask(taskName, dueDate.toDateString());
        renderTasks();
        document.getElementById("task").value = "";
    } 
    else {
        alert("Task name cannot be empty!");
    }
});
  