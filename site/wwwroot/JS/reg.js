// Обработчик события отправки формы
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('submit').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвратить отправку формы по умолчанию

    // Получаем значения из полей формы
    const email = document.querySelector('input[name="email"]').value;
    const firstname = document.querySelector('input[name="firstname"]').value;
    const lastname = document.querySelector('input[name="lastname"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const title = document.querySelector('.begin-like-title').textContent;
    let status = "ученик";

    if (title.includes('учителя')) {
      status = "учитель";
    } else if (title.includes('руководителя школы')) {
      status = "директор";
    } else if (title.includes('родителя')) {
      status = "родитель";
    }
    // Создаем объект пользователя
    const user = {
      "avatar": 0,
      "password": password,
      "surname": firstname,
      "name": lastname,
      "status": status,
      "email": email
    };

    // Опции для запроса
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Указать соответствующий тип данных, если он отличается
      },
      body: JSON.stringify(user) // Преобразование данных в строку JSON
    };

    // Отправка запроса
    fetch('postuser', requestOptions)
      .then(response => {
        if (!response.ok) {
          window.location.href = "../404.html"
        }
        return response.json(); // Или .text(), в зависимости от ожидаемого типа ответа
      })
      .then(data => {
        // Обработка полученных данных
        console.log(data);
      })
      .catch(error => {
        // Обработка ошибок
        console.error('There has been a problem with your fetch operation:', error);
      });

  });
});
