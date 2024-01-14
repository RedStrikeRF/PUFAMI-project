// Обработчик события отправки формы
document.querySelector('.form-begin-like').addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвратить отправку формы по умолчанию

    // Получаем значения из полей формы
    const email = document.querySelector('input[name="email"]').value;
    const firstname = document.querySelector('input[name="firstname"]').value;
    const lastname = document.querySelector('input[name="lastname"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const title = document.querySelector('.begin-like-title').textContent;


    let role = 'ученик'
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
                throw new Error('Network response was not ok');
            }
            localStorage.setItem('PUFAMIUser', JSON.stringify(user));
            window.location.href = "../work_space/classes.html"
            return response.json()
        })
        .catch(error => {
            // Обработка ошибок
            console.error('There has been a problem with your fetch operation:', error);
        });


});