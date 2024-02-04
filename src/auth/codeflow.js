import { clientID} from "./keys.js";
import { codeChallenge } from "./challenge.js";

const authURL = new URL('https://accounts.spotify.com/authorize?');

export async function redirectToAuthCodeFlow() {

  const params = new URLSearchParams();
  params.append("response_type", "code");
  params.append("client_id", clientID);
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", codeChallenge);
  params.append("redirect_uri", "http://localhost:5500/Pages/profile.html");

  authURL.search = new URLSearchParams(params).toString();
  window.location.href=authURL.toString();
}