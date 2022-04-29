document.getElementById('mode').addEventListener('click', () => {

  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');

});

document.body.classList.add('dark');

// if (localStorage.getItem('theme') === 'dark') {

//   document.body.classList.add('dark');

// }
