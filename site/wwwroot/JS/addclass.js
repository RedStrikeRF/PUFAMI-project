document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвращаем отправку формы по умолчанию

  // Получаем значения из полей формы
  const className = document.querySelector('input[name="class_name"]').value;
  const classData = document.querySelector('input[name="class"]').value;
  const user = localStorage.getItem("PUFAMIUser");

  fetch('../JS/classes.json')
  .then(response => {
    if (!response.ok) {
      window.location.href = '../404.html'
    }
    return response.json();
  })
  .then(data => {
    const id = Object.keys(data).length;
  })
  .catch(error => {
    console.error(error);
  });

  const classes = JSON.stringify({
    [id]:
      {
        "name": className,
        "graduate": classData,
        "owner": Object.keys(user)[0],
        "structure" : {}
      }
    });
  // Настройка запроса
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: classes
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
      let classes = localStorage.setItem('PUFAMIUserClass', classes);
      window.location.href = '../work_space/add_student.html'
    })
    .catch(error => {
      // Обработка ошибок
      console.error('Произошла ошибка:', error);
      // Добавьте здесь обработку ошибок
    });
});
