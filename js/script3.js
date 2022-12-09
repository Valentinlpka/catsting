const ul = document.querySelector(".breedAll");
const btn = document.querySelector(".btnanec");

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

let anec = document.querySelector(".anecdotee");

console.log(anec);
btn.addEventListener("click", () => {
  sendRequest("https://catfact.ninja/fact/").then((response) => {
    abc = response;
    anec.textContent = abc.fact;
    console.log("hello");
  });
});
