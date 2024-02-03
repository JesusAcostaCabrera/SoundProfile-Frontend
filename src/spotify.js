const clientID = "5f71f333ece54f9d96151e8380d25495";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
  // There's no code
  redirectAuthCodeFlow(clientID);
} else {
  // There's code
  const accessToken = await getAccessToken(clientID, code);
  const profile = await fetchProfile(accessToken);
  populateUI(profile);
}

async function redirectAuthCodeFlow(accessToken) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientID);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:5500/SoundProfile-Frontend/Pages/profile.html");
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

async function getAccessToken(clientID, code) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientID);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append(
    "redirect_uri",
    "http://localhost:5500/SoundProfile-Frontend/Pages/profile.html"
  );
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const { access_token } = await result.json();
  console.log(access_token);
  return access_token;
}

function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function fetchProfile(token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await result.json();
}

function populateUI(profile) {
    console.log(profile);
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.external_urls.spotify;
    document.getElementById("url").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("photo").setAttribute("src",profile.images[1].url)
}