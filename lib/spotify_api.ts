import SpotifyWebApi from "spotify-web-api-node";

const scopes = ["user-top-read"];
const credentials = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.NEXTAUTH_URL,
};

const spotifyApi = new SpotifyWebApi(credentials);

export {scopes, credentials, spotifyApi}