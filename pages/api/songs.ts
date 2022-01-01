import { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";
import { credentials } from "../../lib/spotify_api";

export default async function songs(req: NextApiRequest, res: NextApiResponse) {
  const token = req.query.token as string;
  let limit = Number(req.query.limit as string);
  let offset = Number(req.query.offset as string);
  let time_range = req.query.time_range as
    | "long_term"
    | "medium_term"
    | "short_term";

  if (!token || token === "undefined") {
    res.status(400).json({ error: "invalid token" });
  }
  if (!limit || isNaN(limit) || limit > 50 || limit < 0) {
    limit = 20;
  }
  if (!offset || isNaN(offset)) {
    offset = 0;
  }
  if (
    !time_range ||
    !["long_term", "medium_term", "short_term"].includes(time_range)
  ) {
    time_range = "medium_term";
  }

  const api = new SpotifyWebApi({ ...credentials, accessToken: token });

  try {
    const songs = await api.getMyTopTracks({
      limit: limit,
      offset: offset,
      time_range: time_range,
    });
    res.status(200).json({ songs: songs.body.items });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "error getting songs" });
  }
  console.log(limit, offset, time_range);
}
