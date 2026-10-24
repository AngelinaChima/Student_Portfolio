// Each task is an object containing an ID, its description and completion status.
// The tasks array is our simple task list, not a database.
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskError = document.getElementById('taskError');
const taskList = document.getElementById('taskList');
let tasks = [];
let nextId = 1;

// Try to load saved tasks. The website still works if storage is unavailable.
try {
  const savedTasks = JSON.parse(localStorage.getItem('academicTasks'));
  if (Array.isArray(savedTasks)) {
    tasks = savedTasks.filter(function(task) {
      return task && typeof task.text === 'string' && typeof task.id === 'number';
    });
    tasks.forEach(function(task) {
      if (task.id >= nextId) { nextId = task.id + 1; }
    });
  }
} catch (error) {
  tasks = [];
}

function saveTasks() {
  try { localStorage.setItem('academicTasks', JSON.stringify(tasks)); }
  catch (error) { /* Continue without saved storage. */ }
}

// Rebuild the visible task list and the three counters.
function showTasks() {
  taskList.replaceChildren();
  let completed = 0;
  tasks.forEach(function(task) {
    if (task.done) { completed++; }
    const item = document.createElement('li');
    item.className = 'task-item';
    if (task.done) { item.classList.add('done'); }
    const label = document.createElement('label');
    label.className = 'task-label';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = Boolean(task.done);
    checkbox.addEventListener('change', function() {
      task.done = checkbox.checked;
      saveTasks();
      showTasks();
    });
    const description = document.createElement('span');
    description.textContent = task.text; // textContent prevents HTML insertion.
    label.appendChild(checkbox);
    label.appendChild(description);
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-task';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', 'Delete task: ' + task.text);
    deleteButton.addEventListener('click', function() {
      tasks = tasks.filter(function(currentTask) { return currentTask.id !== task.id; });
      saveTasks();
      showTasks();
    });
    item.appendChild(label);
    item.appendChild(deleteButton);
    taskList.appendChild(item);
  });
  document.getElementById('totalCount').textContent = tasks.length;
  document.getElementById('pendingCount').textContent = tasks.length - completed;
  document.getElementById('completedCount').textContent = completed;
  document.getElementById('emptyTasks').hidden = tasks.length > 0;
}

// Add a task only if it contains text.
taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const description = taskInput.value.trim();
  if (description === '') {
    taskError.textContent = 'Please enter a task before clicking Add Task.';
    taskInput.focus();
    return;
  }
  taskError.textContent = '';
  tasks.push({ id: nextId, text: description, done: false });
  nextId++;
  taskInput.value = '';
  saveTasks();
  showTasks();
  taskInput.focus();
});
showTasks();
