const todoList = document.querySelector('#list');
const taskName = document.querySelector('#task-name');
const addTask = document.querySelector('#add-task');
const saveList = document.querySelector('#save-list');

function completeTask() {
  const liElement = this.parentElement;
  const spanElement = liElement.querySelector('span');
  spanElement.classList.add('completed');
}

document.addEventListener('DOMContentLoaded', function() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));

  if (savedTasks === null) {
    return;
  }

  for (const task of savedTasks) {
    const newTask = document.createElement('li');
  
    const newTaskName = document.createElement('span');
    newTaskName.textContent = task.text;

    if (task.completed) {
      newTaskName.classList.add('completed');
    }

    const newTaskButton = document.createElement('button');
    newTaskButton.textContent = 'X';
    newTaskButton.addEventListener('click', completeTask);

    newTask.append(newTaskName, newTaskButton);

    todoList.append(newTask);
  }
});

addTask.addEventListener('click', function() {
  const newTask = document.createElement('li');
  
  const newTaskName = document.createElement('span');
  newTaskName.textContent = taskName.value;

  const newTaskButton = document.createElement('button');
  newTaskButton.textContent = 'X';
  newTaskButton.addEventListener('click', completeTask);

  newTask.append(newTaskName, newTaskButton);

  todoList.append(newTask);
});

saveList.addEventListener('click', function() {
  const tasks = [];
  const listElements = todoList.querySelectorAll('li');

  for (const element of listElements) {
    const spanElement = element.querySelector('span');

    tasks.push({
      text: spanElement.textContent,
      completed: spanElement.classList.contains('completed')
    });
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
});
