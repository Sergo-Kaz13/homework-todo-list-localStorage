"use strict";

let userDate = getDateLocalStorage();

function getDateLocalStorage() {
  return JSON.parse(localStorage.getItem("userDate")) || [];
}
showDate(userDate);

const { form } = document.forms;
form.addEventListener("submit", saveNote);
// отримати дані з форми
async function saveNote(e) {
  e.preventDefault();

  const formDate = new FormData(form);
  const values = Object.fromEntries(formDate.entries());

  if (values.item.trim().length) {
    addsDateLocalStorage(values);
    showDate(getDateLocalStorage());
  }
}
function addsDateLocalStorage(date) {
  let userDate = getDateLocalStorage();
  userDate.push(date);
  localStorage.setItem('userDate', JSON.stringify(userDate));
}

function showDate(userList) {
  const userItemsList = document.querySelector('.user-items-list');

  while (userItemsList.firstChild) {
    userItemsList.removeChild(userItemsList.firstChild);
  }

  if (userList.length) {
    userList.forEach(element => {
      const div = document.createElement('div');
      const dateText = document.createElement('span');
      dateText.textContent = element.item;

      const btnRemoveDate = document.createElement('button');
      btnRemoveDate.classList.add('remove');
      btnRemoveDate.textContent = 'X';

      btnRemoveDate.addEventListener('click', b => {
        const removeDate = b.target.closest('div').firstChild.textContent;
        let userDate = JSON.parse(localStorage.getItem("userDate"));
        let date = [];
        userDate.forEach(item => {
          if (removeDate !== item.item) {
            date.push(item);
          }
        })
        localStorage.setItem('userDate', JSON.stringify(date));
        b.target.closest('div').remove();
      })

      div.append(dateText);
      div.append(btnRemoveDate);
      userItemsList.append(div);
    });
  }
}