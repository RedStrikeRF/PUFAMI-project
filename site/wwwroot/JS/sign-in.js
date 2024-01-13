let email;
document.addEventListener('DOMContentLoaded', function() {
  
  const form = document.querySelector('form');
  
  console.log(email);
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    email = document.querySelector('.mail-input').value;
    const password = document.querySelector('.password-input').value;

    // Отправка запроса на сервер
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET',
      /* headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password }) */
    })
    .then(response => response.json())
    .then(data => {
      // Обработка ответа от сервера ASP.NET
      console.log('Полученный ответ от сервера:', data);
      localStorage.setItem(email, data);
      
      window.location.href = '../work_space/classes.html';
      // Ваш код для обработки полученных данных
    })
    .catch(error => {
      console.log('Произошла ошибка:', error);
    });
  });
});