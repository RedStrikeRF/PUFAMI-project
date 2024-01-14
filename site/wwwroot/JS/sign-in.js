// Шаг 1: Получение данных из формы
const form = document.querySelector('.form-sign-in');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвращение отправки формы

  const email = form.email.value;
  const password = form.password.value;

  // Шаг 2: Чтение содержимого файла users.json и преобразование в объект JavaScript
  fetch('JS/users.json')
    .then(response => response.json())
    .then(usersData => {
      // Шаг 3: Проверка, существует ли введенный пользователем email в списке пользователей
      if (usersData[email]) {
        // Шаг 4: Проверка введенного пароля, если пользователь найден
        if (usersData[email].password === password) {
          // Аутентификация успешна
          console.log('Вход выполнен успешно');
        } else {
          // Неправильный пароль
          alert('Неправильный пароль');
        }
      } else {
        // Пользователь не найден
        alert('Пользователь не найден');
      }
    })
    .catch(error => {
      console.error('Произошла ошибка при получении данных из файла users.json', error);
    });
});
