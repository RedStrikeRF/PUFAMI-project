document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвращаем отправку формы по умолчанию

  // Получаем значения из полей формы
  const className = document.querySelector('input[name="class_name"]').value;
  const classData = document.querySelector('input[name="class"]').value;

  // Настройка запроса
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
       class_name: className,
       class: classData 
      })
  };

  // Отправка запроса на сервер
  fetch('addclass', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      let classes = localStorage.getItem('PUFAMIUserClass');
    })
    .catch(error => {
      // Обработка ошибок
      console.error('Произошла ошибка:', error);
      // Добавьте здесь обработку ошибок
    });
});
