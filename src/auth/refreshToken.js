export default async function refreshToken(clientID, refreshToken) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientID,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  
  const data = await response.json();
  return data;
}