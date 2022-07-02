'use strict';

// Save to localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Get from localStorage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Remove an item in localStorage
function removeInStorage(key) {
  localStorage.removeItem(key);
}
