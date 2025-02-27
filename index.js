// Получаем элементы страницы
const input = document.getElementById("task-name");
const addTask = document.getElementById("add-task");
const removeTask = document.getElementById("delete-task");
const taskList = document.getElementById("task-list");
const saveList = document.getElementById("save-list");

// Функция для сохранения задач в localStorage
function saveTasks() {
  const tasks = Array.from(taskList.children).map( li => {
    const span = li.querySelector('span');
    return {
      text: span.textContent,
      completed: span.classList.contains('completed')
    };
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

dispatchEvent(awd)

// Функция для восстановления задач из localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    for (const task of tasks) {

      const taskSpan = document.createElement('span');
      taskSpan.textContent = task.text;
      if (task.completed) {
        taskSpan.classList.add('completed');
      }

      const completeButton = document.createElement('button');
      completeButton.textContent = 'X';
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '-';
      const newTask = document.createElement('li');

      newTask.appendChild(taskSpan);
      newTask.appendChild(completeButton);
      newTask.appendChild(deleteButton);
      taskList.appendChild(newTask);

      completeButton.addEventListener('click', () => {
        taskSpan.classList.toggle('completed');
        saveTasks(); // Сохраняем после изменения статуса
      });

      deleteButton.addEventListener('click', () => {
        taskList.removeChild(newTask);
        saveTasks(); // Сохраняем после удаления
      });
    }
  }
}

// Восстанавливаем задачи при загрузке страницы
loadTasks();

// Функция для добавления новой задачи
addTask.addEventListener("click", () => {
  const task = input.value.trim();
  if (task !== '') {

    const newTask = document.createElement('li');
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task;
    const completeButton = document.createElement('button');
    completeButton.textContent = "X";
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "-";

    newTask.appendChild(taskSpan);
    newTask.appendChild(completeButton);
    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);
    input.value = '';

    completeButton.addEventListener('click', () => {
      taskSpan.classList.toggle('completed'); // Исправлено на 'completed'
      saveTasks(); // Сохраняем после изменения статуса
    });

    deleteButton.addEventListener('click', () => {
      taskList.removeChild(newTask);
      saveTasks(); // Сохраняем после удаления
    });
  }
});

// Функция для удаления всех задач
removeTask.addEventListener("click", () => {
  taskList.innerHTML = null;
  localStorage.removeItem('tasks');
});

// Функция для сохранения задач при нажатии на "Liste speichern"
saveList.addEventListener('click', saveTasks);

