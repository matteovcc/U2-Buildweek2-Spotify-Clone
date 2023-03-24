const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const endpoint = id
  ? "https://striveschool-api.herokuapp.com/api/deezer/artist/" + id
  : "https://striveschool-api.herokuapp.com/api/deezer/artist/412";

fetch(endpoint)
  .then(response => response.json())
  .then(artistData => {
    displayArtist(artistData);
    artistPopularSongs(artistData);
    displayArtistAlbum(artistData);
    console.log(artistData);
  })
  .catch(error => {
    console.error(error);
  });

function displayArtist(artistData) {
  const artistCover = document.getElementById("artistPage");
  artistCover.style.backgroundImage = "url('" + artistData.picture_xl + "')";
  artistCover.style.backgroundPosition = "top";
  artistCover.style.backgroundSize = "cover";
  artistPage.innerHTML += `<div class="container-fluid mt-5">
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
  </div>`;
}

function artistPopularSongs(artistData) {
  fetch(endpoint + "/top?limit=50")
    .then(response => response.json())
    .then(popularSongs => {
      console.log(popularSongs);
      const songsContainer = document.getElementById("popularArtistSongs");
      const popularSongsList = document.createElement("ol");
      popularSongsList.style.paddingInlineStart = 0
      songsContainer.appendChild(popularSongsList);
      let index = 1;
      popularSongs.data.forEach(song => {
        const minutes = Math.floor(song.duration / 60);
        const seconds = Math.floor(song.duration % 60);
        const durationString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        const songArtist = document.createElement("li");
        songArtist.style.display = "flex";
        songArtist.style.justifyContent = "space-between";
        songArtist.style.alignItems = "center";
        songArtist.style.paddingBlock = "0.4rem"
        songArtist.innerHTML = `<div class="d-flex align-items-center gap-3">
            <span class="text-light">${index}</span> 
            <a href="album-page.html?id=${song.album.id}"><img src="${song.album.cover_small}" alt="artistTrack" width="35" height="35"></a>
            <p class="text-light fw-bold my-auto">${song.title}</p> 
           </div>
           <div class="d-flex gap-5">
             <p class="text-light my-auto">${song.rank}</p>
             <p class="text-light my-auto">${durationString}</p>
           </div>`;
        popularSongsList.appendChild(songArtist);
        index++;

        songArtist.addEventListener("click", () => {
          playTrack(song.preview);
          const playerImg = document.getElementById("song-img");
          const songSinger = document.getElementById("song-artist");
          const songTitle = document.getElementById("song-title");

          playerImg.src = song.album.cover_small;
          songTitle.innerText = song.title;
          songSinger.innerText = song.artist.name;
        });

        const playBtn = document.getElementById("play");
        playBtn.addEventListener("click", () => {
          playTrack();
          playBtn.innerHTML = `<span class="text-center text-dark fw-bold d-flex rounded-circle"><svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg></span>`;
        });
        function playTrack(trackUrl) {
          const audioPlayer = document.getElementById("audio-player");
          audioPlayer.src = trackUrl;
          audioPlayer.play();
        }
      });
      const favoriteSongs = document.getElementById("favoriteArtistSongs");
      const info = document.createElement("div");
      info.style.display = "flex";
      info.style.justifyContent = "start";
      info.style.alignItems = "center";
      info.innerHTML = `<a href="artist-page.html?id=${artistData.id}"><img src=${artistData.picture_small} class="rounded-circle me-2" width="60" height="60"></a>
        <p class="text-light"><span class="text-light fw-bold">Hai messo Mi piace a 11 brani</span><br>di <a href="artist-page.html?id=${artistData.id}">${artistData.name}</a></p>`;
      favoriteSongs.appendChild(info);
    });
}

function displayArtistAlbum(artistData) {
  fetch(endpoint + "/top?limit=50")
    .then(response => response.json())
    .then(artistAlbums => {
      const artistAlbumList = document.getElementById("artistAlbumList");
      artistAlbumList.innerHTML = `<div class="col-12 d-flex justify-content-between">
  <h3 class="text-white">Altro di ${artistData.name}</h3>
  <a href="">
    <p class="text-secondary fw-semibold">Vedi discografia</p>
  </a>
  </div>`;

      artistAlbums.data.forEach(album => {
        artistAlbumList.innerHTML += `<div class="col-3">
    <a href="album-page.html?id=${album.album.id}"><div class="card bg-dark p-2" style="height:340px;">
      <img src="${album.album.cover_big}" class="card-img-top" alt="..."/>
      <div class="card-body">
        <p class="card-text text-white">${album.album.title}</p>
        
      </div>
    </div>
    </a>
  </div>`;
      });
    });
}
