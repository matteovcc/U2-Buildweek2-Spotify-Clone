const endPoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get("albumId");


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
  mainTrack.innerHTML = 
}
