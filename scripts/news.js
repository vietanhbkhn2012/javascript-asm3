'use strict';

// Select elements
const settingArr = getFromStorage('settingArr') || [];
const currentUser = getFromStorage('currentUser') || {};
const current = settingArr.find((setting) => currentUser.username === setting.username) || {};
const endPoints = 'top-headlines';
const country = 'us';
const category = 'General';
const pageSize = 20;

(async () => {
  // Show first page
  Object.keys(current).length ? await displayNews(endPoints, country, current.category, '', current.pageSize) : await displayNews(endPoints, country, category, '', pageSize);

  // Check and display the page navigation and news
  Object.keys(current).length ? await checkDisplay(endPoints, country, current.category, '', current.pageSize) : await checkDisplay(endPoints, country, category, '', pageSize);
})();
