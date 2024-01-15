document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search');
  const resultsContainer = document.createElement('div');
  const allClasses = JSON.parse(localStorage.getItem("PUFAMIAllClassesMain"));
  const userClasses = JSON.parse(localStorage.getItem("PUFAMIUserClass"));
  const currentClass = JSON.parse(localStorage.getItem("PUFAMICurrentClassId"))
  resultsContainer.classList.add('results-container');
  searchInput.after(resultsContainer);
  let selectedUser = undefined; // Добавляем переменную для хранения выбранного пользователя

  searchInput.addEventListener('input', () => {
    const inputValue = searchInput.value.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem("PUFAMIAllUsersMain"));

    while (resultsContainer.firstChild) {
      resultsContainer.removeChild(resultsContainer.firstChild);
    }

    const matchingUsers = Object.values(users).filter(user => {
      return (
        user.name.toLowerCase().includes(inputValue) ||
        user.surname.toLowerCase().includes(inputValue) ||
        user.email.toLowerCase().includes(inputValue)
      );
    });
    displayMatchingUsers(matchingUsers, resultsContainer);
  });

  resultsContainer.addEventListener('click', () => {
    searchInput.value = selectedUser.name + " " + selectedUser.surname + " " + selectedUser.email;
    resultsContainer.style.display = 'none';
  });

  const form = document.querySelector('.form');
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // предотвращаем отправку формы
    // Здесь можно вызвать функцию или выполнить другие операции с выбранным пользователем

    if (!allClasses[currentClass]['structure'][selectedUser["email"]]) {

      allClasses[currentClass]['structure'][selectedUser["email"]] = {};
      userClasses[currentClass]['structure'][selectedUser["email"]] = {};

      localStorage.setItem('PUFAMIAllClassesMain', JSON.stringify(allClasses));
      localStorage.setItem('PUFAMIUserClass', JSON.stringify(userClasses));
      window.location.href = "./add_student.html";
    } else {
      alert("Этот пользователь уже есть, или еще не зарегистрирован");
    }

    
  });

  document.addEventListener('click', (event) => {
    if (!resultsContainer.contains(event.target)) {
      resultsContainer.style.display = 'none';
    }
  });

  function displayMatchingUsers(users, container) {
    if (users.length > 0) {
      container.style.display = 'block';
      users.forEach(user => {
        const resultItem = document.createElement('div');
        resultItem.textContent = `${user.name} ${user.surname} ${user.email}`;
        resultItem.classList.add('result-item');
        resultItem.addEventListener('click', () => {
          searchInput.value = `${user.name} ${user.surname} ${user.email}`;
          selectedUser = user; // Сохраняем выбранного пользователя
          resultsContainer.style.display = 'none';
        });
        container.appendChild(resultItem);
      });
    } else {
      container.style.display = 'none';
    }
  }
});
