'use strict';

// Select elements
const loginBtn = document.getElementById('btn-submit');
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const userArr = getFromStorage('userArr') || [];

// Catch the register button click event
loginBtn.addEventListener('click', function () {
  // Get data from input form
  const userData = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  // Validate the data
  const validatedForm = function () {
    let sameUser = false;
    let samePassword = false;
    for (let i = 0; i < userArr.length; i++) {
      if (userData.username === userArr[i].username) {
        sameUser = true;
        if (userData.password === userArr[i].password) samePassword = true;
      }
    }
    if (!sameUser) {
      alert('Login failed. Username is incorrect!');
      usernameInput.focus();
      return false;
    } else if (!samePassword) {
      alert('Login failed. Password is incorrect!');
      passwordInput.focus();
      return false;
    }
    return true;
  };
  const validated = validatedForm();

  // Add an user to the list
  if (validated) {
    saveToStorage('currentUser', userData);
    location.href = '../index.html';
  }
});
