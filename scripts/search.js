'use strict';

// Select elements
const queryInput = document.getElementById('input-query');
const searchBtn = document.getElementById('btn-submit');
const endPoints = 'everything';
const pageSize = 20;

// Hide page navigation when not searching
navPageNum.classList.add('d-none');

// Handle the search button click event
searchBtn.addEventListener('click', async () => {
  const keyWord = queryInput.value;

  // Show first page
  keyWord.trim() ? await displayNews(endPoints, '', '', keyWord, pageSize) : alert('You need to enter a keyword.');

  // Check and display the page navigation and news
  await checkDisplay(endPoints, '', '', keyWord, pageSize);
});
