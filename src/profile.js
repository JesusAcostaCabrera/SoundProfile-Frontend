export async function fetchProfile(accessToken){
    const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
    const response = await result.json();
    return await response;
}