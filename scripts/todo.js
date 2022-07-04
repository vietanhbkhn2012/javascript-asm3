'use strict';

// Select elements
const addBtn = document.getElementById('btn-add');
const taskInput = document.getElementById('input-task');
const todoList = document.getElementById('todo-list');
const currentUser = getFromStorage('currentUser') || {};
let taskArr = getFromStorage('taskArr') || [];

// Reload data
renderData();

// Render data
function renderData() {
  todoList.innerHTML = '';
  taskArr.forEach((task, i) => {
    if (task.owner === currentUser.username) {
      const isDone = task.isDone ? ` class="checked"` : ``;
      const html = `<li id="${i}"${isDone}>${task.task}<span class="close" data-id="${i}">×</span></li>`;
      todoList.insertAdjacentHTML('beforeend', html);
    }
  });
}

// Catch the add button click event
addBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  const owner = currentUser.username;
  const isDone = false;

  // validate the data
  function validatedForm() {
    let check = false;
    for (let i = 0; i < taskArr.length; i++) {
      if (taskArr.owner === currentUser.username && task === taskArr[i].task) {
        check = true;
        break;
      }
    }
    if (!owner) {
      alert('You need to login to use this feature.');
      return false;
    }
    if (task === '') {
      alert('You have to enter information.');
      taskInput.focus();
      return false;
    }
    if (check) {
      alert('This task already exists.');
      check = false;
      taskInput.focus();
      return false;
    }
    return true;
  }
  // Add a task
  const validated = validatedForm();
  if (validated) {
    const data = new Task(task, owner, isDone);
    taskArr.push(data);
    // Save to Storage
    saveToStorage('taskArr', taskArr);
    // Show tasks
    renderData();
    // Reset taskInput
    taskInput.value = '';
  }
});

// Toggle Task
todoList.addEventListener('click', e => {
  if (e.target.nodeName !== 'LI') return;
  if (!e.target.id) return;
  const idTask = e.target.id;
  taskArr.forEach((task, i, taskArr) => {
    if (i == idTask) taskArr[i].isDone = e.target.classList.toggle('checked');
  });
  saveToStorage('taskArr', taskArr);
  renderData();
});

// Delete Task
todoList.addEventListener('click', e => {
  if (e.target.nodeName !== 'SPAN') return;
  if (!e.target.getAttribute('data-id')) return;
  const idTask = e.target.getAttribute('data-id');
  if (isNaN(idTask)) return;
  if (!confirm('Are you sure?')) return;
  taskArr.splice(idTask, 1);
  saveToStorage('taskArr', taskArr);
  renderData();
});
