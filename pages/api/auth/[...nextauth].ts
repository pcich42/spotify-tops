import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import { scopes, spotifyApi } from "../../../lib/spotify_api";

async function refreshAccessToken(token: JWT) {
  try {
    spotifyApi.setAccessToken(token.accessToken as string);
    spotifyApi.setRefreshToken(token.refreshToken as string);
  } catch (error) {}
  return {};
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: { scope: scopes.join(",") },
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ account, user, token }) {
      // TODO: czemu account i token obydwa zwracają access_token:
      // account zwraca info o zalogowaniu m.i. access_token
      //  ktory potem dodaje to token, który jest zwracany w kolejnych jwt

      // initial sign in
      // if (account && user) {
      //   return {
      //     ...token,
      //     accessToken: account.access_token,
      //     refreshToken: account.refresh_token,
      //     accessTokenExpires: account.expires_at * 1000, // miliseconds,
      //   };
      // }
      // // Return previous token if the access token has not expired yet
      // if (Date.now() < token.accessTokenExpires) {
      //   return token;
      // }

      // // Access token has expired, try to update it
      // return await refreshAccessToken(token);

      // if account exists (sign in) - get the access_token from it and attach it to the jwt token
      if (account && user) {
        return { ...token, accessToken: account.access_token, user };
      }
      // otherwise just return the previous token
      else return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      // session.error = token.error;
      session.accessToken = token.accessToken;

      return session;
    },
  },
});
