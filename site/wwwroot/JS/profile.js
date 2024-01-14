document.addEventListener("DOMContentLoaded", function() {
  // Получаем ссылки на элементы input и объект JSON
  const inputName = document.querySelector('input[name="name"]');
  const inputSurname = document.querySelector('input[name="surname"]');
  const avatar_choice = document.querySelector('.avatar-choice');
  const data = JSON.parse(localStorage.getItem('PUFAMIUser'));
  const form = document.querySelector('.profile-form');

  const key = Object.keys(data)[0]
  const content = data[key];
  // Устанавливаем placeholder из значений объекта JSON

  
  let new_avatar = content.avatar;
  inputName.placeholder = content.name;
  inputSurname.placeholder = content.surname;
  avatar_choice.style.backgroundImage = `url('../image/avatars/${content.avatar}.png')`;


  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const userData = {
      name: inputName.value || content.name,
      surname: inputSurname.value || content.surname,
      avatar: new_avatar
    };
    
    // Настройка запроса
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    };
    
    // Отправка запроса на сервер
    fetch('/update', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Или .text(), в зависимости от ожидаемого типа ответа
      })
      .then(data => {

        let newUser = {key : {
          name: userData.name,
          surname: userData.surname,
          avatar: userData.avatar,
          email: content.email,
          password: content.password,
          role: content.role,
        }}
        // Обработка полученных данных
        localStorage.setItem('PUFAMIUser', JSON.stringify(newUser));
      })
      .catch(error => {
        // Обработка ошибок
        console.error('There has been a problem with your fetch operation:', error);
      });
  })

  
});