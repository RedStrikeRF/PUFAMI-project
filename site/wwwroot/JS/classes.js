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
    console.log(owner)
    let done = {};
    done[owner] = [];

    // Перебираем полученные данные
    Object.keys(data).forEach(id => {
      const item = data[id];
      if (item.owner == owner) {
        done[owner].push(item);
        container.append(drawClass(id, item.name, item.graduate))
      }
    }); 

    localStorage.setItem('PUFAMIUserClass', JSON.stringify(done));
  })
  .catch(error => {
    console.error(error);
  });
})


function drawClass(id, className, classSpecification) {
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
  });

  return button;
}