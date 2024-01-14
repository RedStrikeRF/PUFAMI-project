document.addEventListener("DOMContentLoaded", function() {
  // Получаем ссылки на элементы input и объект JSON
  const inputName = document.querySelector('input[name="name"]');
  const inputSurname = document.querySelector('input[name="surname"]');
  const avatar_choice = document.querySelector('.avatar-choice');
  const data = JSON.parse(localStorage.getItem('PUFAMIUser'));
  console.log(data)

  // Устанавливаем placeholder из значений объекта JSON
  inputName.placeholder = data.name;
  inputSurname.placeholder = data.surname;
  avatar_choice.style.backgroundImage = `url('../image/avatars/${data.avatar}.png')`;

  
});