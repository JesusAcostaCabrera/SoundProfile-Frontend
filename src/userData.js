export default async function getUserData(accessToken) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data = await response.json();
  return data;
}