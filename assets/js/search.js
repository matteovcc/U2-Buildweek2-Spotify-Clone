const form = document.querySelector("form");
const searchButton = document.getElementById("search");
const searchInput = document.querySelector("input");
const container = document.getElementById("container");
const section = document.getElementById("section");

form.addEventListener("submit", event => {
  event.preventDefault();
  const query = searchInput.value;
  const url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
      container.innerHTML = "";
      section.innerHTML = "";
      search(data);
    })
    .catch(error => {
      console.log(error);
    });
});

function search(data) {
  data.data.forEach(element => {
    const query = searchInput.value;
    if (query === element.artist.name) {
      section.innerHTML = element.artist.name;
    } else if (query === element.title) {
      section.innerHTML = element.title;
    } else {
      section.innerHTML = "Risultati della ricerca:";
    }
    const newDiv = document.createElement("div");
    newDiv.className = "row justify-content-xl-center mb-3 g-1";
    newDiv.innerHTML = `
  <div class="col-4">
  <a href="album-page.html?id=${element.album.id}"><img src="${element.album.cover_xl}" class="img-fluid img-overlay" alt="${element.title}"></a>
  </div>
  <div class="col-8 px-3 px-xl-5 d-flex flex-column justify-content-center">
    <div class="d-flex justify-content-between mt-1">
      <p id="album" class="text-white fw-semibold mb-0">${element.album.title}</p>
    </div>
    <div id="song-title" class="mt-1">
      <h2 class="text-white">${element.title}</h2>
    </div>
    <div id="author" class="mt-1">
    <a href="artist-page.html?id=${element.artist.id}"><p class="text-white mb-1">${element.artist.name}</p></a>
    </div>
    <div id="btn-container" class=" d-flex align-items-center">
      <button class="bg-success text-dark border-0 rounded-pill fw-semibold py-1 px-2 px-xl-4 me-2" id="play-btn">Play</button>
      <button class="bg-dark text-white border rounded-pill border-opacity-25 fw-semibold py-1 px-2 px-xl-4 me-2" id="save-btn">Salva</button>
      <button class="bg-transparent border-0 text-white fs-1" id="info">...</button>
    </div>
  </div>
`;
    container.appendChild(newDiv);
  });
}

// function search(data) {
//   data.data.forEach(element => {
//     const track = element.preview;
//     const play = getElementById("play-btn");
//     play.addEventListener("click", () =>
//     const trackImg
//     const trackTitle
//     const artistName

//     )
//   }
