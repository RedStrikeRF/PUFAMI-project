document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвращаем отправку формы по умолчанию

  // Получаем значения из полей формы
  const className = document.querySelector('input[name="class_name"]').value;
  const classData = document.querySelector('input[name="class"]').value;
  const user = localStorage.getItem("PUFAMIUser");
  let userClasses = localStorage.getItem("PUFAMIUserClass");
  let newClass = {};
  let Class = {};
  let id = 0;

  fetch('../JS/classes.json')
  .then(response => {
    if (!response.ok) {
      window.location.href = '../404.html'
    }
    return response.json();
  })
  .then(data => {
    id = Object.keys(data).length;
  })
  .then(temp => {
    newClass = {
      "name": className,
      "graduate": classData,
      "owner": user,
      "structure" : {}
    }
    Class = JSON.stringify({
      [id]: newClass
        
      });
    // Настройка запроса
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: Class
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
        userClasses.id = newClass;
        localStorage.setItem('PUFAMICurrentClassId', JSON.stringify(id));
        localStorage.setItem("PUFAMIUserClass", userClasses);
        window.location.href = '../work_space/add_student.html'
      })
      .catch(error => {
        // Обработка ошибок
        console.error('Произошла ошибка:', error);
        // Добавьте здесь обработку ошибок
      });
    }
  )
  .catch(error => {
    console.error(error);
  });

  
});
