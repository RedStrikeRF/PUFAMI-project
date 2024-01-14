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

    let newUser = {
      name: inputName.value ? inputName.value : content.name,
      surname: inputSurname.value ? inputSurname.value : content.surname,
      avatar: new_avatar,
      email: content.email,
      password: content.password,
      role: content.role,
    }
    localStorage.setItem('PUFAMIUser', JSON.stringify({[key]: newUser}));
    
    // Настройка запроса
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    };
    
    // Отправка запроса на сервер
    fetch('/update', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Или .text(), в зависимости от ожидаемого типа ответа
      })
      .catch(error => {
        // Обработка ошибок
        console.error('There has been a problem with your fetch operation:', error);
      });
  })

  avatar_choice.addEventListener('click', function() {
    // Добавляем всплывающее окно (модальное окно)
    showModal();
  });
  
  // Функция для отображения модального окна
  function showModal() {
    // Создаем модальное окно
    const modal = document.createElement('div');
    const container = document.createElement('div');

    modal.className = 'modal';
    container.classList.add('modal-container');
    modal.append(container)
  
    // Создаем кнопки выбора аватарки
    for (let i = 0; i <= 10; i++) {
      const button = document.createElement('button');
      button.className = 'avatar-select';
      button.style.backgroundImage = `url('../image/avatars/${i}.png')`;
      button.addEventListener('click', function() {
        // Сохраняем выбранную цифру в переменной new_avatar
        new_avatar = i;
        avatar_choice.style.backgroundImage = `url('../image/avatars/${new_avatar}.png')`;
        // Закрываем модальное окно
        closeModal(modal);
      });
      container.appendChild(button);
    }
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-modal';
    closeButton.textContent = '';
    closeButton.addEventListener('click', function() {
      closeModal(modal);
    });
    modal.appendChild(closeButton);

    document.body.appendChild(modal);
  }
  
  // Функция для закрытия модального окна
  function closeModal(modal) {
    document.body.removeChild(modal);
  }
});