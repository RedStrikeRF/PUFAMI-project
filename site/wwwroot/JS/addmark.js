document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.mark-container');
  const skills = ['Помощь другим', 'Работа в команде', 'Усердная работа', 'Активное участие', 'Плохое поведение', 'Нет домашней работы', 'Опоздание']; // список навыков
  const userEmail = localStorage.getItem("PUFAMICurrentStudent");
  console.log(userEmail); // ваш email для использования в качестве ключа

  // Создаем кнопки с цифрами и добавляем их в контейнер
  const skillCounts = {}; // объект для отслеживания количества кликов на каждый навык

  skills.forEach((skill, index) => {
    const button = document.createElement('button');
    const counter = document.createElement('p');
    const image = document.createElement('img');
    image.src = `../image/marks/${index+1}.png`; // предполагаем, что у вас есть изображения с названиями 0.png, 1.png и т.д.
    image.alt = skill;
    counter.textContent = 0;
    button.append(counter); // начальное значение для цифры
    button.classList.add('mark');
    button.appendChild(image); // добавляем изображение в кнопку
    skillCounts[skill] = 0; // начальное значение количества кликов
    button.addEventListener('click', () => {
      // Проверяем, сделано ли уже максимальное количество кликов (в данном случае 2)
      if (skillCounts[skill] < 2) {
        let count = parseInt(button.textContent);
        count++;
        button.textContent = count;
        skillCounts[skill] = count;

      } else {
        // Можно добавить здесь сообщение пользователю о достижении лимита кликов
      }
    });
    container.appendChild(button);
  });

  // Обработка нажатия на кнопку "Сохранить" (опционально, это для тестирования)
  const saveButton = document.querySelector('.button');
  saveButton.addEventListener('click', () => {
    console.log(skillCounts); // выводим результат в консоль
  });
});

// Функция для сохранения количества кликов в JSON файл
// function saveSkillCounts(email, skillCounts) {
//   // Замените на вашу логику отправки на сервер или сохранения в файл
//   console.log(`Сохранение количества кликов для email ${email}:, skillCounts`);
//   // Пример отправки на сервер
//   fetch('ссылка_на_ваш_сервер', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email: email, skillCounts: skillCounts }),
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Успешно сохранено:', data);
//     })
//     .catch(error => {
//       console.error('Ошибка сохранения:', error);
//     });
// }
