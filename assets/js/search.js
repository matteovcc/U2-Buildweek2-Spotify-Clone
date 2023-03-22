const endPoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get("albumId");

const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", () => {
  const query = document.querySelector(".form-control").value;
  window.location.href = ``;
});
