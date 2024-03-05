import { clientID, redirectURL } from "./auth/key.js";
import redirectToSpotifyAuthorize from "./auth/redirectSpotify.js";
import getToken from "./auth/getToken.js";
import getUserData from "./userData.js";
import getUserCurrentSong from "./userSong.js";

const args = new URLSearchParams(window.location.search);
const code = args.get("code");

const currentToken = {
  get access_token() {
    return localStorage.getItem("access_token") || null;
  },
  get refresh_token() {
    return localStorage.getItem("refresh_token") || null;
  },
  get expires_in() {
    return localStorage.getItem("refresh_in") || null;
  },
  get expires() {
    return localStorage.getItem("expires") || null;
  },

  save: function (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in);

    const now = new Date();
    const expiry = now.getTime() + expires_in * 1000;
    localStorage.setItem("expires", expiry);
  },
};
const now = new Date();

if (code && currentToken.expires <= now.getTime()) {
  console.log(currentToken.expires);
  console.log(now.getTime());
  // El usuario ya se autorizo.
  const token = await getToken(code, clientID, redirectURL);
  currentToken.save(token);

  // Remove code from URL so we can refresh correctly.
  const url = new URL(window.location.href);
  url.searchParams.delete("code");

  const updatedUrl = url.search ? url.href : url.href.replace("?", "");
  window.history.replaceState({}, document.title, updatedUrl);
} else if (!code) {
  await redirectToSpotifyAuthorize(clientID, redirectURL);
}

// El usuario ya inicio sesion, vamos a cargar informacion
if (currentToken.access_token) {
  if (currentToken.expires <= now.getTime()) {
    const token = await refresh_token(clientID, currentToken.refresh_token);
    currentToken.save(token);
  }
  const userData = await getUserData(currentToken.access_token);
  console.log(userData);
  updateProfile(userData);

  let userSong = await getUserCurrentSong(currentToken.access_token);
  updateSong(userSong);
  console.log(userSong);

  let actualTime = Math.floor(userSong.progress_ms / 1000);
  let totalTime = Math.floor(userSong.item.duration_ms / 1000);

  if (userSong.is_playing === true) {
    setTimeout(actualTime % 1000);
    while (actualTime !== totalTime) {
      setTimeout(1000);
      userSong = await getUserCurrentSong(currentToken.access_token);
      let actualTime = Math.floor(userSong.progress_ms / 1000);
      let totalTime = Math.floor(userSong.item.duration_ms / 1000);
      
      document.getElementById('actual-progress').style.width = `${(actualTime/totalTime)*100}%`;
      if (actualTime === totalTime) {
        setTimeout(() => {location.reload();}, 50000);
      }
      updateSong(userSong);
    }
  }
}

function updateSong(song) {
  const artists = song.item.artists;
  let names = "";
  artists.map((singer) => {
    singer.name === artists[artists.length - 1].name
      ? (names += singer.name)
      : (names += `${singer.name}, `);
  });

  document
    .getElementById("song-image")
    .setAttribute("src", song.item.album.images[0].url);
  document.getElementById("song-name").innerHTML = song.item.name;
  document.getElementById("song-artist").innerHTML = names;

  let actualTime = formatTime(song.progress_ms);
  let totalTime = formatTime(song.item.duration_ms);

  document.getElementById("actual-time").innerHTML = actualTime;
  document.getElementById("total-time").innerHTML = totalTime;
  document.getElementById('song-link').setAttribute('href',song.item.external_urls.spotify)
}

function updateProfile(profile) {
  document
    .getElementById("photo-header")
    .setAttribute("src", profile.images[1].url); // Setting Spotify profile picture
  document
    .getElementById("profile-photo")
    .setAttribute("src", profile.images[1].url); // Setting Spotify profile picture
  
    document.getElementById('spotify-button-link').setAttribute('href',profile.external_urls.spotify);
}

function formatTime(ms) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;

  minutes = minutes > 9 ? `${minutes}` : `0${minutes}`;
  seconds = seconds > 9 ? `${seconds}` : `0${seconds}`;
  return `${minutes}:${seconds}`;
}
