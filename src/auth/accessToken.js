import { clientID } from "./keys.js";
import { codeVerifier } from "./verifier.js";

export default async function getAccessToken(code) {
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientID,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:5500/Pages/profile.html",
      code_verifier: codeVerifier,
    }),
  };

  const body = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: {
      grant_type: "authorization_code",
      client_id: clientID,
      code: code,
      redirect_uri: "http://localhost:5500/Pages/profile.html",
      code_verifier: codeVerifier,
    },
  });
  const response = await body.json();

  return response;
  // const result = await fetch("https://accounts.spotify.com/api/token", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //   body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`
  // });

  // const response = await result.json();
  // return response;
}
