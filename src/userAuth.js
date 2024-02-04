import getAccessToken from "./auth/accessToken.js";
import { redirectToAuthCodeFlow } from "./auth/codeflow.js";
import { fetchProfile } from "./profile.js";
const params = new URLSearchParams(window.location.search);
const code = params.get('code');

if(!code){
    redirectToAuthCodeFlow(code);
}else{
    const response = await getAccessToken(code);
    console.log(response);
    // const profile = await fetchProfile(response.access_token);
    // console.log(profile);
}