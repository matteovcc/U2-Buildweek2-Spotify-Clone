const form = document.querySelector("form");
const searchButton = document.getElementById("search");
const searchInput = document.querySelector("input");
const container = document.getElementById("container");

searchButton.addEventListener("click", event => {
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
      search(data);
    })
    .catch(error => {
      console.log(error);
    });
});
function search(data) {
  data.data.forEach(element => {
    const newDiv = document.createElement("div");
    newDiv.className = "row mb-3 g-1";
    newDiv.innerHTML = `
  <div class="col-4">
    <img src="${element.album.cover_xl}" class="img-fluid img-overlay" alt="${element.title}">
  </div>
  <div class="col-8 px-3 d-flex flex-column">
    <div class="d-flex justify-content-between mt-1">
      <p class="text-white fw-semibold">${element.album.title}</p>
    </div>
    <div id="song-title" class="mt-1">
      <h2 class="text-white fs-4">${element.title}</h2>
    </div>
    <div id="author" class="mt-1">
      <p class="text-white">${element.artist.name}</p>
    </div>
    <div id="btn-container" class=" d-flex align-items-center">
      <button class="bg-success text-dark border-0 rounded-pill fw-semibold py-1 px-2 me-2" id="play-btn">Play</button>
      <button class="bg-dark text-white border rounded-pill border-opacity-25 fw-semibold py-1 px-2 me-2" id="save-btn">Salva</button>
      <button class="bg-transparent border-0 text-white fs-1" id="info">...</button>
    </div>
  </div>
`;
    container.appendChild(newDiv);
  });
}
