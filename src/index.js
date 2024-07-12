let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
    postToys(); 
  });
});

const collection = document.getElementById('toy-collection');

const getToys = () => {
  fetch('http://localhost:3000/toys')
  .then(res => {
    if(!res.ok){
      throw new Error('Network response was not ok.')
  }
    return res.json()
  })
  .then (data => {
    console.log(data);
    data.forEach(element => {
      let div = document.createElement('div');
      div.classList.add('card');
      let image = document.createElement('img')
      image.src = element.image;
      image.classList.add('toy-avatar')
      div.appendChild(image);
      collection.appendChild(div);
      let h2 = document.createElement('h2');
      h2.textContent = element.name;
      let p = document.createElement('p');
      p.textContent = element.likes;
      let button = document.createElement('button');
      button.classList.add('like-btn');
      button.id = element.id;
      div.appendChild(h2);
      div.appendChild(p);
      div.appendChild(button);

      button.addEventListener('click', ()=> patchToys());

    })
  })
  .catch(error => console.log("Error:", error));
}

const postToys = () => {
  const formData = {
    "name": "Jessie",
    "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
    "likes": 0
  }
  
  const postconfig = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(formData),
  }
  return fetch('http://localhost:3000/toys', postconfig)
    .then(data => {
      collection.innerHTML = ''; 
      getToys(); 
    })
};

const patchToys = (toyId) => {
  const formData = {
    "likes": "newNumberOfLikes"
  }
  
  const patchconfig = {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(formData),
  }
  return fetch(`http://localhost:3000/toys/${toyId}`, patchconfig)
  .then(data => {
    collection.innerHTML = ''; 
    getToys(); 
  })
}