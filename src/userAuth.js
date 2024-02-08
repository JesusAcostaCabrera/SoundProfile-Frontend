import { clientID, redirectURL } from './auth/key.js';
import redirectToSpotifyAuthorize from './auth/redirectSpotify.js';
import getToken from './auth/getToken.js';
import getUserData from './userData.js';

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
    console.log(response);
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in);

    const now = new Date();
    const expiry = new Date(now.getTime() + expires_in * 1000);
    localStorage.setItem("expires", expiry);
  },
};

if (code) {
  // El usuario ya se autorizo.
  const token = await getToken(code, clientID, redirectURL);
  currentToken.save(token);

  // Remove code from URL so we can refresh correctly.
  const url = new URL(window.location.href);
  url.searchParams.delete("code");

  const updatedUrl = url.search ? url.href : url.href.replace("?", "");
  window.history.replaceState({}, document.title, updatedUrl);
} else if (!code){
  await redirectToSpotifyAuthorize(clientID, redirectURL);
}

// El usuario ya inicio sesion, vamos a cargar informacion
if (currentToken.access_token) {
  const userData = await getUserData(currentToken.access_token);

  document.getElementById('id').innerHTML = userData.id;
  document.getElementById('email').innerHTML = userData.email;
  document.getElementById('photo').setAttribute('src', userData.images[1].url)
}