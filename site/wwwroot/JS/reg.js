// Обработчик события отправки формы
document.querySelector('.form-begin-like').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвратить отправку формы по умолчанию

    // Получаем значения из полей формы
    const email = document.querySelector('input[name="email"]').value;
    const firstname = document.querySelector('input[name="firstname"]').value;
    const lastname = document.querySelector('input[name="lastname"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const title = document.querySelector('.begin-like-title').textContent;

    let role = "ученик";

    if (title.includes('учителя')) {
      role = "учитель";
    } else if (title.includes('руководителя школы')) {
      role = "директор";
    } else if (title.includes('родителя')) {
      role = "родитель";
    }
    // Создаем объект пользователя
    const user = {
      "avatar": 0,
      "password": password,
      "surname": firstname,
      "name": lastname,
      "role": role,
      "email": email
    };
    localStorage.setItem("userbug", JSON.stringify(user));
    const existingData = require('../JS/users.json');

    // Добавление новых данных
    existingData.newProperty = user;
    alert(user);
    // Преобразование объекта обратно в JSON
    const updatedData = JSON.stringify(existingData, null, 2);
    console.log(updatedData)
    // Запись обновленных данных обратно в файл
    fs.writeFileSync('../JS/users.json', updatedData);
    window.location.href = '../404.html'
    // Отправка запроса
    

});
