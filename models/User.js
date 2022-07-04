'use strict';

// Create User class
class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
}

// Create Task class
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// Select elements
const newsContainer = document.getElementById('news-container');
const navPageNum = document.getElementById('nav-page-num');
const previousBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const pageNumber = document.getElementById('page-num');
let totalResults;

// Display each news
function html(data) {
  return `
    <div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${data.urlToImage}" class="card-img" alt="${data.title}" />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${data.title}</h5>
              <p class="card-text">${data.content}</p>
              <a href="${data.url}" class="btn btn-primary">View</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render data
function renderData(dataArr) {
  newsContainer.innerHTML = '';
  dataArr.forEach((data) => {
    newsContainer.insertAdjacentHTML('beforeend', html(data));
  });
}

// Display the news
async function displayNews(endPoints, country, category, q, pageSize, page) {
  try {
    const apiKey1 = '1f5004a966ec4e4b8b02457700243131';
    const apiKey2 = 'f092d1497a8f4cf5a8a86ac1d6467115';
    const apiKey3 = '859d890300f1444d985f90483097420e';
    let response;
    const res = async (apiKey) => {
      response = await fetch(`https://newsapi.org/v2/${endPoints}?country=${country}&category=${category}&q=${q}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`);
      return response.ok;
    };
    // Check apiKeys
    (await res(apiKey1)) || (await res(apiKey2)) || (await res(apiKey3));
    // Get the content of the articles
    const dataObject = await response.json();
    const dataArr = dataObject.articles || [];
    console.log(response);
    console.log(dataObject);
    totalResults = dataObject.totalResults || 0;
    // Throw an exception error
    if (!response.ok) throw `Error ${response.status}: ${dataObject.message}`;
    // Render data
    if (dataArr.length) renderData(dataArr);
    else if (q.length && !dataArr.length) newsContainer.innerHTML = `<b>${q}</b> was not found in any document.`;
    else newsContainer.innerHTML = `Couldn't find any articles on <b>${category}</b>.`;
  } catch (error) {
    if (error.message == 'Failed to fetch') {
      navPageNum.classList.add('d-none');
      newsContainer.innerHTML = `ERR_INTERNET_DISCONNECTED`;
    } else {
      newsContainer.innerHTML = `${error}`;
      nextBtn.classList.add('d-none');
    }
  }
}

// Check and display the page navigation and news
async function checkDisplay(endPoints, country, category, q, pageSize) {
  let page = 1;
  const check = totalResults ? true : false;
  if (check) {
    navPageNum.classList.remove('d-none');
    pageNumber.innerHTML = `${page}`;
    previousBtn.classList.add('d-none');
    if (page >= totalResults / pageSize) nextBtn.classList.add('d-none');
    else nextBtn.classList.remove('d-none');
    // Handle the Previous button click event
    previousBtn.addEventListener('click', async function () {
      if (page > 1) {
        page--;
        nextBtn.classList.remove('d-none');
      }
      await displayNews(endPoints, country, category, q, pageSize, page);
      pageNumber.innerHTML = `${page}`;
      if (page <= 1) previousBtn.classList.add('d-none');
      else previousBtn.classList.remove('d-none');
    });
    // Handle the Next button click event
    nextBtn.addEventListener('click', async function () {
      if (page < totalResults / pageSize) {
        page++;
        previousBtn.classList.remove('d-none');
      }
      await displayNews(endPoints, country, category, q, pageSize, page);
      pageNumber.innerHTML = `${page}`;
      if (page >= totalResults / pageSize) nextBtn.classList.add('d-none');
      else nextBtn.classList.remove('d-none');
    });
  } else navPageNum.classList.add('d-none');
}
