'use strict';

// Select elements
const registerBtn = document.getElementById('btn-submit');
const firstNameInput = document.getElementById('input-firstname');
const lastNameInput = document.getElementById('input-lastname');
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const confirmPasswordInput = document.getElementById('input-password-confirm');
const userArr = getFromStorage('userArr') || [];

// Catch the register button click event
registerBtn.addEventListener('click', function () {
  // Get data from input form
  const userData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
    confirmPassword: confirmPasswordInput.value,
  };
  // Validate the data
  const validatedForm = function () {
    let sameUser = false;
    for (let i = 0; i < userArr.length; i++) {
      if (userData.username === userArr[i].username) {
        sameUser = true;
      }
    }
    if (userData.firstName.trim() === '') {
      alert('Please enter first name!');
      firstNameInput.focus();
      return false;
    }
    if (userData.lastName.trim() === '') {
      alert('Please enter last name!');
      lastNameInput.focus();
      return false;
    }
    if (userData.username.trim() === '') {
      alert('Please enter username!');
      usernameInput.focus();
      return false;
    } else if (sameUser === true) {
      alert('Username must unique!');
      usernameInput.focus();
      return false;
    }
    if (userData.password.length <= 8) {
      alert('Password must be more than 8 characters!');
      passwordInput.focus();
      return false;
    }
    if (userData.confirmPassword.localeCompare(userData.password) !== 0) {
      alert('Password and confirmation password must be the same!');
      confirmPasswordInput.focus();
      return false;
    }
    return true;
  };
  const validated = validatedForm();

  // Add an user to the list
  if (validated) {
    const user = new User(userData.firstName, userData.lastName, userData.username, userData.password);
    userArr.push(user);
    saveToStorage('userArr', userArr);
    location.href = './login.html';
  }
});
