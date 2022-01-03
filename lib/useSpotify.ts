import axios from "axios";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

interface TopItemsOptions {
  limit?: number;
  offset?: number;
  time_range?: string;
}

function useSpotifyArtists(
  session: Session | undefined,
  options: TopItemsOptions
) {
  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (session) {
      axios
        .get("http://localhost:3000/api/artists", {
          params: {
            token: session.accessToken,
            limit: options.limit,
            offset: options.offset,
            time_range: options.time_range,
          },
        })
        .then((value) => {
          setArtists(value.data.artists);
          setError(null);
        })
        .catch((err) => {
          setArtists([]);
          setError(JSON.stringify(err.data));
        });
    } else {
      setArtists([]);
    }
  }, [session, options]);
  return {
    artists,
    error,
  };
}

function useSpotifySongs(session: Session, options: TopItemsOptions) {
  const [songs, setSongs] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [error, setError] = useState<string>();
  useEffect(() => {
    if (session) {
      axios
        .get("http://localhost:3000/api/songs", {
          params: {
            token: session.accessToken,
            limit: options.limit,
            offset: options.offset,
            time_range: options.time_range,
          },
        })
        .then((value) => {
          setSongs(value.data.songs);
          setError(null);
        })
        .catch((err) => {
          setSongs([]);
          setError(JSON.stringify(err.data));
        });
    } else {
      setSongs([]);
    }
  }, [session, options]);
  return {
    songs,
    error,
  };
}

export { useSpotifySongs, useSpotifyArtists };
