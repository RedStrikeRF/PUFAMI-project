document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.sign-in-button');

  button.addEventListener('click', getRequest());
})

async function getRequest() {
  await fetch('./login').then(el => {console.log(el)}).catch(error => {console.log('error')});
}