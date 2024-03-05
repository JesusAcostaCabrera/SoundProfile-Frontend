export default async function getUserCurrentSong(accessToken) {

  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  });
  const data = await response.json();
  return data;
}
