document.addEventListener('DOMContentLoaded', () => {
  
  fetch('../JS/classes.json')
  .then(response => {
    if (!response.ok) {
      window.location.href = '../404.html'
    }
    return response.json();
  })
  .then(data => {
    const container = document.querySelector('.classes-container');
    const owner = Object.keys(JSON.parse(localStorage.getItem('PUFAMIUser')))[0];

    let userLocalClass = JSON.parse(localStorage.getItem("PUFAMIUserClass"));
    let allUserClass = JSON.parse(localStorage.getItem('PUFAMIAllClassesMain'));
    
    // Перебираем полученные данные
    if (!userLocalClass || Object.keys(userLocalClass).length === 0) {
      userLocalClass = {};
      // Перебираем полученные данные и добавляем их в userLocalClass
      Object.keys(data).forEach(id => {
          const item = data[id];
          if (item.owner == owner) {
            container.append(drawClass(id, item.name, item.graduate));
            userLocalClass[id] = item;
          }
      });
    } else {
      Object.keys(userLocalClass).forEach(el => {
        console.log(el, userLocalClass[el].name, userLocalClass[el].graduate)
        container.append(drawClass(el, userLocalClass[el].name, userLocalClass[el].graduate))
      })
      // Перебираем полученные данные и добавляем их в userLocalClass, если они отсутствуют
      Object.keys(data).forEach(id => {
        const item = data[id];
        if (item.owner == owner && !userLocalClass[id]) {
            container.append(drawClass(id, item.name, item.graduate));
            userLocalClass[id] = item;
        }
      });
    }

    if (!allUserClass || Object.keys(allUserClass).length === 0) {
      allUserClass = data;
    } else {
      // Перебираем полученные данные и добавляем их в userLocalClass, если они отсутствуют
      Object.keys(data).forEach(id => {
          const item = data[id];
          if (!allUserClass[id]) 
            allUserClass[id] = item;
      });
    }

    localStorage.setItem('PUFAMIUserClass', JSON.stringify(userLocalClass));
    localStorage.setItem('PUFAMIAllClassesMain', JSON.stringify(allUserClass));
  })
  .catch(error => {
    console.error(error);
  });

  fetch('../JS/users.json')
  .then(response => {
    if (!response.ok) {
      window.location.href = '../404.html'
    }
    return response.json();
  })
  .then(data => {
    localStorage.setItem("PUFAMIAllUsersMain", JSON.stringify(data));
  })
  .catch(error => {
    console.error(error);
  });
})


function drawClass(className, classSpecification) {
  const button = document.createElement('button');
  const title = document.createElement('h3');
  const descr = document.createElement('p');

  button.classList.add("class-container", "added-class");
  title.classList.add("class-title");
  descr.classList.add("class-number");

  title.textContent = className;
  descr.textContent = classSpecification;

  button.append(title);
  button.append(descr);

  button.addEventListener('click', () => {
    localStorage.setItem('PUFAMICurrentClassId', id)
    window.location.href = "./add_student.html"
  });

  return button;
}