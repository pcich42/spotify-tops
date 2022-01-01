import { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";
import { credentials } from "../../lib/spotify_api";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;
  const api = new SpotifyWebApi(credentials);

  try {
    const value = await api
      .authorizationCodeGrant(code);
    res.status(200).json({
      accessToken: value.body.access_token,
      refreshToken: value.body.refresh_token,
      expiresIn: value.body.expires_in,
    });
  } catch (reason) {
    res.status(400).json(reason);
  }
}
