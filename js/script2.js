const ul = document.querySelector(".breedAll");


function init() {
  anecdotesRaces()
  avoirCoats()
  avoirCountry()
}

init();

function sendRequest(url) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.send();

    xhr.onload = function () {
      if (xhr.status == 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        console.log("Une erreur s'est produite");
      }
    };
  });
}

sendRequest("https://catfact.ninja/breeds").then((response) => {
//Recuperer numero de la derniere page  
const lastpage = response.last_page;

  const result = document.querySelector('.result')
  result.textContent = response.total + " résultats"
});

async function getCoats() {
  return new Promise((resolve) => {
    sendRequest("https://catfact.ninja/breeds").then(async (response) => {
      let lastpage = response.last_page;
      let arrayPelage = [];
      for (let index = 1; index <= lastpage; index++) {
        let response = await sendRequest(
          "https://catfact.ninja/breeds?page=" + index
        );

        response.data.forEach((race) => {
          arrayPelage.push(race.coat);
        });
      }
      // setInterval(() => {
      // }, 2000);
      resolve(arrayPelage);

    });
  });
}

async function getCountry() {
  return new Promise((resolve) => {
    sendRequest("https://catfact.ninja/breeds").then(async (response) => {
      let lastpage = response.last_page;
      let arrayPelage = [];
      for (let index = 1; index <= lastpage; index++) {
        let response = await sendRequest(
          "https://catfact.ninja/breeds?page=" + index
        );

        response.data.forEach((race) => {
          arrayPelage.push(race.country);
        });
      }
      resolve(arrayPelage);

    });
  });
}

async function avoirCountry() {

  let uniquePelage = await getCountry()
  let pelages = [...new Set(uniquePelage)]
  pelages.sort();
  pelages.shift();

for (let index = 0; index < pelages.length; index++) {
  let select = document.querySelector('#pays')
let coat = document.createElement('option')
  coat.value = pelages[index];
coat.textContent = pelages[index]
select.appendChild(coat)}
}

async function avoirCoats() {

  let uniquePelage = await getCoats()
  let pelages = [...new Set(uniquePelage)]
  pelages.sort();
  pelages.shift();


for (let index = 0; index < pelages.length; index++) {
  let select = document.querySelector('#pelage')
let coat = document.createElement('option')
  coat.value = pelages[index];
coat.textContent = pelages[index]
select.appendChild(coat)}
}

async function infosRace() {
  return new Promise((resolve) => {
    sendRequest("https://catfact.ninja/breeds").then(async (response) => {
      let lastpage = response.last_page;
      let arrayPelage = [];
      for (let index = 1; index <= lastpage; index++) {
        let response = await sendRequest(
          "https://catfact.ninja/breeds?page=" + index
        );

        response.data.forEach((race) => {
          arrayPelage.push(race);
        });
      }
      resolve(arrayPelage);



    });
  });
}
// infosRace()

async function elementOfPellage() {
  return new Promise((resolve) => {
    sendRequest("https://catfact.ninja/breeds").then(async (response) => {
      let lastpage = response.last_page;
      let arrayPelage = [];
      for (let index = 1; index <= lastpage; index++) {
        let response = await sendRequest(
          "https://catfact.ninja/breeds?page=" + index
        );

        response.data.forEach((race) => {
          arrayPelage.push(race);
        });
      }
      resolve(arrayPelage);
      const lis = document.querySelectorAll('.breedAll li')
      const pays = document.querySelector('.pays-race')
      const origine = document.querySelector('.origine-race')
      const pelage = document.querySelector('.pelage-race')
      const race = document.querySelector('.race')
      console.log(lis);
      for (let index = 0; index < lis.length; index++) {
        lis[index].addEventListener('click', (event) => {
          const breed = arrayPelage.find(bree => bree.breed === event.target.textContent);
          console.log(event.target);
          race.innerHTML = breed.breed
          pays.innerHTML = 'Pays : ' + breed.country
          origine.innerHTML = 'Origine : ' + breed.origin
          pelage.innerHTML = 'Pelage : ' + breed.coat 
        })
        
      }
      


    });
  });
}
elementOfPellage();




function anecdotesRaces() {
  sendRequest("https://catfact.ninja/breeds").then((response) => {
    let lastpage = response.last_page;

    for (let index = 1; index <= lastpage; index++) {
      sendRequest("https://catfact.ninja/breeds?page=" + index).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let li = document.createElement("li");
          li.className = "list-group-item abcd";
          li.textContent = response.data[i].breed;
          ul.appendChild(li);
        }
      });
    }
  });
}


