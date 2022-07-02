'use strict';

// Select elements
const pageSizeInput = document.getElementById('input-page-size');
const categoryInput = document.getElementById('input-category');
const submitBtn = document.getElementById('btn-submit');
const currentUser = getFromStorage('currentUser') || {};
const settingArr = getFromStorage('settingArr') || [];

// Handle the Save Settings button click event
submitBtn.addEventListener('click', function () {
  const data = {
    pageSize: parseInt(pageSizeInput.value),
    category: categoryInput.value,
    username: currentUser.username,
  };
  // Validate the data
  const validatedForm = function () {
    if (!data.username) {
      alert('You need to login to use this feature!');
      return false;
    }
    if (isNaN(data.pageSize)) {
      alert('Please enter pageSize!');
      pageSizeInput.focus();
      return false;
    } else if (data.pageSize < 1 || data.pageSize > 100) {
      alert('pageSize must be between 1 and 100!');
      pageSizeInput.focus();
      return false;
    }
    return true;
  };
  const validated = validatedForm();

  // Add an user to the list
  if (validated) {
    const index = settingArr.findIndex(setting => setting.username === data.username);
    if (index > -1) settingArr.splice(index, 1, data);
    else settingArr.push(data);
    saveToStorage('settingArr', settingArr);
    alert('Settings have been saved.');
  }
});
