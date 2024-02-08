export default async function getToken(code, clientID, redirectURL) {
  const code_verifier = localStorage.getItem("code_verifier");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientID,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectURL,
      code_verifier: code_verifier,
    }),
  });
  const data = await response.json();

  return data;
};