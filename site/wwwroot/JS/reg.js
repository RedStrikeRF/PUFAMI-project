// Обработчик события отправки формы
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('submit').addEventListener('click', function(event) {
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
      "firstname": firstname,
      "lastname": lastname,
      "status": status
    };

    // Загружаем текущий users.json файл
    fetch('../JS/users.json')
      .then(response => response.json())
      .then(data => {
        // Добавляем нового пользователя в объект JSON
        data[email] = user;
        console.log(data);
        // Записываем обновленные данные обратно в users.json
        fetch('../JS/users.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(result => {
          console.log('Пользователь успешно добавлен в users.json', result);
          // Можно выполнить дополнительные действия после успешной записи, например, перенаправить пользователя на другую страницу
        })
        .catch(error => {
          console.error('Произошла ошибка при добавлении пользователя в users.json', error);
        });
      })
      .catch(error => {
        console.error('Произошла ошибка при загрузке users.json', error);
      });
  });
});
