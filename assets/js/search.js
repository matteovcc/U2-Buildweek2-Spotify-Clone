const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", () => {
  const query = document.querySelector(".form-control").value;
  window.location.href = `artist-page.html?q="${query}`;
});
