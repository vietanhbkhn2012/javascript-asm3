'use strict';

// Select elements
const logoutBtn = document.getElementById('btn-logout');
const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMessage = document.getElementById('welcome-message');
const userArr = getFromStorage('userArr') || [];
const currentUser = getFromStorage('currentUser') || {};

// Display the interface of the homepage
if (Object.keys(currentUser).length) {
  loginModal.classList.add('d-none');
  const firstName = userArr.find(user => user.username === currentUser.username).firstName;
  welcomeMessage.innerHTML = `Welcome ${firstName}`;
} else mainContent.classList.add('d-none');

// Log out from the homepage
logoutBtn.addEventListener('click', function () {
  removeInStorage('currentUser');
  location.href = './pages/login.html';
});
