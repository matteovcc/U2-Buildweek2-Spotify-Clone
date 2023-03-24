const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get("id");
const link = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const endpoint = albumId ? link + albumId : link;

let currentTrackIndex = 0;
let isPlaying = false;
let currentTrackTimeout = null;

window.onload = () => {
  fetch(endpoint)
    .then(response => response.json())
    .then(albumData => {
      displayAlbum(albumData);
      console.log(albumData);
    })
    .catch(error => {
      console.error(error);
    });
};
function displayAlbum(albumData) {
  const albumTitle = document.getElementById("album-title");
  const albumArtist = document.getElementById("artist-name");
  const albumIcon = document.getElementById("img-icon");
  const albumImg = document.getElementById("album-img");
  const releaseDate = document.getElementById("release-date");
  const trackList = document.getElementById("list-track");
  const artistDiscover = document.getElementById("artist-discover");
  const numberTracks = document.getElementById("number-tracks");

  albumTitle.innerText = albumData.title;
  albumArtist.innerText = albumData.artist.name;
  albumImg.src = albumData.cover;
  albumIcon.src = albumData.cover_small;
  releaseDate.innerText = albumData.release_date;
  artistDiscover.innerText = albumData.artist.name;
  numberTracks.innerText = albumData.tracks.data.length + " brani";
  console.log(albumData.tracks.data.length);

  let tracks = document.getElementById("tracks");
  tracks.innerHTML = "";

  albumData.tracks.data.forEach(track => {
      const minutes = Math.floor(track.duration / 60);
          const seconds = Math.floor(track.duration % 60);
          const durationString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    const trackAlbum = document.createElement("li");
    // trackAlbum.innerHTML = `<div class="ms-3"><p class="mb-0">${track.title}</p><p class="text-secondary fw-semibold">${albumData.artist.name}</p></div>`;
    trackAlbum.innerHTML = `
    <div class="container-fluid d-flex">
    
    <div class="col-12 mx-0 col-md-7 ms-4 px-4">
                    <p class="text-white mb-0 fw-semibold">${track.title}</p>
                    <a href="artist-page.html?id=${albumData.artist.id}"><p class="text-secondary fw-semibold">${albumData.artist.name}</p></a>
                  </div>

                  <div class="d-none d-md-flex col-md-5 justify-content-between">
                    <p class="text-secondary fw-semibold">${track.rank}</p>
                    <p class="text-secondary fw-semibold ">${durationString}</p>
                  </div>
     </div>             
                  `;

    trackAlbum.addEventListener("click", () => {
      playTrack(track.preview);
      const playerImg = document.getElementById("song-img");
      const songArtist = document.getElementById("song-artist");
      const songTitle = document.getElementById("song-title");
      //   const playButton = document.getElementById("play");

      playerImg.src = albumData.cover_small;
      songTitle.innerText = track.title;
      songArtist.innerText = albumData.artist.name;
    });

    trackList.appendChild(trackAlbum);

    
           const playBtn = document.getElementById("play");
           playBtn.addEventListener("click", () => {
            playTrack()
            playBtn.innerHTML = `<span class="text-center text-dark fw-bold d-flex rounded-circle"><svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg></span>`;
           })

    function playTrack(trackUrl) {
      const audioPlayer = document.getElementById("audio-player");
      const playButton = document.getElementById("play-button");
      if (isPlaying) {
        audioPlayer.pause();
        playButton.innerHTML = `<button
          id="play-button"
          aria-label="Play"
          data-encore-id="buttonPrimary"
          class="Button-sc-qlcn5g-0 eHhJDl btn btn-success rounded-5 py-1 px-0"
        >
          <span
            class="ButtonInner-sc-14ud5tc-0 dpREpp encore-bright-accent-set"
          >
            <span
              aria-hidden="true"
              class="IconWrapper__Wrapper-sc-1hf1hjl-0 fSnHJ"
            >
              <svg
                role="img"
                height="28"
                width="28"
                aria-hidden="true"
                viewbox="0 0 24 24"
                data-encore-id="icon"
                class="Svg-sc-ytk21e-0 uPxdw"
              >
                <path
                  d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                ></path>
              </svg>
            </span>
          </span>
        </button>`;
        clearTimeout(currentTrackTimeout);
      } else {
        audioPlayer.src = trackUrl;
        audioPlayer.play();
        playButton.innerHTML =
          '<span class="d-flex justify-content-center vertical-align-middle py-1 px-2 fw-bold fs-5">| |</span>';
        currentTrackTimeout = setTimeout(highlightCurrentTrack, 500);
      }
      isPlaying = !isPlaying;
    }
  });
  document.getElementById("play-button").addEventListener("click", () => {
    playTrack(albumData.tracks.data[currentTrackIndex].preview);
  });

  function playTrack(trackUrl) {
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.src = trackUrl;
    audioPlayer.play();
    highlightCurrentTrack();
  }

  function highlightCurrentTrack() {
    const trackAlbums = document.querySelectorAll("#list-track li p");
    trackAlbums.forEach((trackAlbum, index) => {
      if (index === currentTrackIndex) {
        trackAlbum.classList.add("green-title");
      } else {
        trackAlbum.classList.remove("green-title");
      }
    });
  }

  highlightCurrentTrack();
}
