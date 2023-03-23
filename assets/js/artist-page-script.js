const urlParams = new URLSearchParams(window.location.search)
const artistId = urlParams.get("artistId")

fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/412")
.then((response) => response.json())
.then((artistData) => {
    displayArtist(artistData)
    artistPopularSongs(artistData)
    console.log(artistData)
})
.catch((error) => {
    console.error(error)
})

function displayArtist(artistData) {
    const artistCover = document.getElementById("artistPage")
    artistCover.style.backgroundImage = "url('"+ artistData.picture_xl +"')"
    artistCover.style.backgroundPosition = "top"
    artistCover.style.backgroundSize = "cover"
    artistPage.innerHTML += `<div class="container-fluid mt-5 ms-2">
    <div class="row g-1">
      <div class="col-6">
        <div class="d-flex">
          <i class="bi bi-check-circle"></i>
          <h5 class="text-light" id="artist-badge">Artista verificato</h5>
        </div>
        <h1 class="text-light">${artistData.name}</h1>
        <h5 class="py-3 text-light">${artistData.nb_fan} ascoltatori mensili</h5>
      </div>
          
    </div> 
  </div>`
}

function artistPopularSongs(artistData){
    fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=50")
    .then((response) => response.json())
    .then((popularSongs) => {
        const songsContainer = document.getElementById("popularArtistSongs")
        const popularSongsList = document.createElement("ol")
        songsContainer.appendChild(popularSongsList)
        let index = 1
        popularSongs.data.forEach(song => {
            const songArtist = document.createElement("li")
            songArtist.style.display = "flex"
            songArtist.style.justifyContent = "space-between"
            songArtist.style.alignItems = "center"
            songArtist.innerHTML = `<div class="d-flex align-items-center gap-3">
            <span class="text-light">${index}</span> 
            <img src="${song.album.cover_small}" alt="artistTrack" width="35" height="35">
            <p class=text-light fw-bold >${song.title}</p> 
           </div>
           <div class="d-flex gap-5">
             <p class=text-light>${song.rank}</p>
             <p class=text-light>${song.duration}</p>
           </div>`
           popularSongsList.appendChild(songArtist)
           index++
        });
    })
}