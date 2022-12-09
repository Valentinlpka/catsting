const ul = document.querySelector(".breedAll");

function init() {
  randomFact();
  allFacts();
  allRaces();
  findMostCoat();
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

function randomFact() {
  sendRequest("https://catfact.ninja/fact/").then((response) => {
    let anec = document.querySelector(".anecdotes");
    abc = response;
    anec.textContent = abc.fact;
  });
}

function allFacts() {
  sendRequest("https://catfact.ninja/facts").then((response) => {
    let anecdotes = document.querySelector(".anecdotes");
    dataFacts = response;
    anecdotes.textContent = dataFacts.total;
  });
}

function allRaces() {
  sendRequest("https://catfact.ninja/breeds?page=4").then((response) => {
    let dataRace = response.data;
    let races = document.querySelector(".races");
    races.textContent = response.total;
    lol = response.data.filter((response) => response.country === "Greece");
  });
}

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

async function findMostCoat() {
  let textPelage = document.querySelector(".textPelage");
  let arrayPelage = await getCoats();
  let nombreMax = 1;
  let nombreActuel = 0;
  let plusHaut;

  for (let i = 0; i < arrayPelage.length; i++) {
    for (let f = i; f < arrayPelage.length; f++) {
      if (arrayPelage[i] == arrayPelage[f]) {
        nombreActuel++;
      }
      if (nombreMax < nombreActuel) {
        nombreMax = nombreActuel;
        plusHaut = arrayPelage[i];
      }
    }
    nombreActuel = 0;
  }
  console.log(plusHaut + " est le plus haut");
  textPelage.innerHTML = plusHaut;
}
