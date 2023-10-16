const open = 'https://open.popoway.me/'
const pclss = 'https://ming.fyi/'
const static = 'https://static.popoway.me/'
let accounts

function darkModeIndicator() {
    document.querySelector('.dark-mode-indicator').addEventListener('click', (event) => {
      window.alert('To toggle dark mode, switch light/dark appearance settings (if supported) on your system preferences.');
    });
}

function accountSearchInit() {
  document.querySelector('#accountSearch').addEventListener('keydown', (event) => {
    window.setTimeout( () => {
      // console.log(document.querySelector('#accountSearch').value);
      accountPopulate(document.querySelector('#accountSearch').value);  
    }, 20); // allow 20ms for browser to update value before grabing it
  });
  document.querySelector('#accountSearch').value = '';
}

function accountFetch() {
  fetch(`${open}accounts.json`)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      accounts = data.payload;
      accountPopulate('');
    });
}

function accountPopulate(searchParam) {
  document.querySelector('#accounts').textContent = '';
  for (const account of accounts) {
    const condition = (searchParam != '') ? account.service.toLowerCase().includes(searchParam.toLowerCase()) : account.visible;
    if (condition) {
      let item = document.createElement('li');
      let link = document.createElement('a');
      item.appendChild(link);
      link.href = `${pclss}${account.pclss}`;
      link.target = '_blank';
      let icon = document.createElement('div');
      // icon.classList.add('fa-li');
      let iconI = document.createElement('i');
      iconI.className = account.icon;
      iconI.classList.add('fa-fw');
      iconI.classList.add('fa-xl');
      icon.appendChild(iconI);
      link.appendChild(icon);
      let text = document.createElement('div');
      text.textContent = account.service;
      link.appendChild(text);
      document.querySelector('#accounts').appendChild(item);  
    }
  }
}

function hack() {
  document.querySelector('#footerYear').textContent = new Date().getFullYear();
  console.log('%cHi there!', 'color:white; background:#439FEF; font-size: 16pt');
  console.log('%cLove to hack? Connect with me on LinkedIn: ming.fyi/linkedin or Email me at ming@popoway.com', 'font-size: 12pt');
}

window.addEventListener('DOMContentLoaded', (event) => {
  accountSearchInit();
  accountFetch();
  darkModeIndicator();
  hack();
});
