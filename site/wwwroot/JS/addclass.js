document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвращаем отправку формы по умолчанию

  // Получаем значения из полей формы
  const className = document.querySelector('input[name="class_name"]').value;
  const classData = document.querySelector('input[name="class"]').value;
  
  const allClasses = JSON.parse(localStorage.getItem('PUFAMIAllClassesMain'));
  const owner = Object.keys(JSON.parse(localStorage.getItem('PUFAMIUser')))[0];
  const userClasses = JSON.parse(localStorage.getItem("PUFAMIUserClass"));
  let classCount = Object.keys(allClasses).length;
  
  const newClass = {
    "name": className,
    "graduate": classData,
    "owner": owner,
    "structure" : {}
  };
  allClasses[classCount] = newClass;
  console.log(allClasses)
  userClasses[classCount] = newClass;
  console.log(userClasses)

  localStorage.setItem('PUFAMIAllClassesMain', JSON.stringify(allClasses));
  localStorage.setItem('PUFAMIUserClass', JSON.stringify(userClasses));
  localStorage.setItem('PUFAMICurrentClassId', classCount)
  window.location.href = './add_student.html';
});
