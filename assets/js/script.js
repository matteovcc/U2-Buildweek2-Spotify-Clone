const endPoint = "https://striveschool-api.herokuapp.com/api/deezer/album/390984";
const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get("albumId");
const user = document.getElementById("profile");
const nomeUtente = localStorage.getItem("username");

if (nomeUtente) {
  user.innerHTML = "";
  user.innerHTML = `<button class="bg-dark border border-dark rounded d-flex align-items-center"><img width="20px" class="rounded-circle" src="assets/images/epicode.jfif" alt=""><span id="nomeUtente" class="text-white ms-2">${nomeUtente}</span></button>`;
}

fetch(endPoint)
  .then(response => response.json())
  .then(trackData => {
    track(trackData);
  })
  .catch(error => {
    console.error(error);
  });

function track(trackData) {
  const mainTrack = document.getElementById("mainTrack");
  mainTrack.innerHTML = `<div id="mainTrack" class="row g-1">
  <div class="col-4">
    <img src="${trackData.artist.picture_xl}" class="img-fluid" alt="${trackData.title}">
  </div>
  <div class="col-8 px-3">
    <div class="d-flex justify-content-between">
      <p class="text-white fw-semibold">ALBUM</p>
      <button id="btn-hide" class="p-1 border-dark border-opacity-25 rounded-2 text-center d-flex-end bg-dark text-secondary fs-6">NASCONDI ANNUNCI</button>      
    </div>
    <div id="song-title" class="mt-2">
      <h2 class="text-white fs-1">${trackData.title}</h2>
    </div>
    <div id="author" class="mt-4">
      <p class="text-white">${trackData.artist.name}</p>
    </div>
    <div id="btn-container" class="mt-5">
      <button class="bg-success text-dark border-0 rounded-pill fw-semibold py-3 px-5 me-2" id="play-btn">Play</button>
      <button class="bg-dark text-white border rounded-pill border-opacity-25 fw-semibold py-3 px-5 me-2" id="save-btn">Salva</button>
      <button class="bg-transparent border-0 text-white fs-1" id="info">...</button>
    </div>
  </div>
`;
}
