document.addEventListener('DOMContentLoaded', () => {
  const currentClass = JSON.parse(localStorage.getItem("PUFAMICurrentClassId"));
  const userClasses = JSON.parse(localStorage.getItem("PUFAMIUserClass"));
  const allUser = JSON.parse(localStorage.getItem("PUFAMIAllUsersMain"));
  const container = document.querySelector('.student-container');

  Object.keys(userClasses[currentClass]["structure"]).forEach(el => {
    if(allUser[el]) {
      
      container.append(drawClass(el, allUser[el]["avatar"], allUser[el]["name"], allUser[el]["surname"]));
    }
  })
});


function drawClass(email, avatar_number,name, surname) {
  const button = document.createElement('button');
  const avatar = document.createElement('img');
  const fullName = document.createElement('h3');

  button.classList.add('student');
  avatar.classList.add('img-avatar');
  avatar.src = `../image/avatars/${avatar_number}.png`;
  fullName.textContent = `${name} ${surname}`;
  fullName.classList.add('profile')

  button.append(avatar);
  button.append(fullName);

  button.addEventListener('click', () => {
    localStorage.setItem("PUFAMICurrentStudent", email)
    window.location.href = "../work_space/add_revie.html"
  });

  return button;
}