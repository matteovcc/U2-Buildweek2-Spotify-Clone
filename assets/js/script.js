const endPoint = "https://striveschool-api.herokuapp.com/api/deezer/track/";
const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get("albumId");

let trackID = "3590185";

fetch(endPoint + trackID)
  .then(response => response.json())
  .then(trackData => {
    track(trackData);
  })
  .catch(error => {
    console.error(error);
  });

function track(trackData) {
  const mainTrack = document.getElementById("mainTrack");
  mainTrack.innerHTML = `<div id="mainTrack"class="row g-1">
  <div class="col-4">
    <img src="${trackData.picture_big}" class="img-fluid" alt="${trackData.title}">
  </div>
  <div class="col-8">
    <div class="d-flex justify-content-between">
      <p class="text-white fw-semibold">${trackData.album}</p>
      <button id="btn-hide" class="p-1 border-dark border-opacity-25 rounded text-center d-flex-end bg-dark text-secondary ">NASCONDI ANNUNCI</button>      
    </div>
    <div id="song-title" class="mt-2">
      <h2 class="text-white">${trackData.title}</h2>
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
