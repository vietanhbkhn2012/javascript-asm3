'use strict';

// Select elements
const addBtn = document.getElementById('btn-add');
const taskInput = document.getElementById('input-task');
const currentUser = getFromStorage('currentUser') || {};

addBtn.addEventListener('click', () => {
  const data = {
    task: taskInput.value,
    owner: currentUser.username,
    isDone: false,
  };
  // validate the data
  function validatedForm() {}
});
