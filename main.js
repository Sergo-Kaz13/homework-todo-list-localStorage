'use strict'


const {form} = document.forms;

form.addEventListener('submit', saveNote);

async function saveNote(e) {
  e.preventDefault();
  let userDate = JSON.parse(localStorage.getItem('userDate')) || [];

  const formDate = new FormData(form);
  const values = Object.fromEntries(formDate.entries());
  userDate.push(JSON.stringify(values));
  localStorage.setItem('userDate', JSON.stringify(userDate));
}

console.log(JSON.parse(localStorage.getItem('userDate')));
