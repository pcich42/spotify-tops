import { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";
import { credentials } from "../../lib/spotify_api";

export default async function refresh(req: NextApiRequest, res: NextApiResponse) {
  const refreshToken = req.query.refreshToken as string;
  const api = new SpotifyWebApi({ ...credentials, refreshToken: refreshToken });
  try {
    const value = await api
      .refreshAccessToken();
    res.json({
      accessToken: value.body.access_token,
      expiresIn: value.body.expires_in,
    });
  } catch (reason) {
    res.status(400).json(reason);
  }
}
