import axios from "axios";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface songOptions {
  limit?: number;
  offset?: number;
  time_range?: string;
}

function useSpotify() {
  const [songs, setSongs] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [error, setError] = useState();
  const [user, setUser] = useState<User>();
  const [songOptions, setSongOptions] = useState<songOptions>({
    limit: 50,
    offset: 0,
    time_range: "short_term",
  });
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      axios
        .get("http://localhost:3000/api/songs", {
          params: {
            token: session.accessToken,
            limit: songOptions.limit,
            offset: songOptions.offset,
            time_range: songOptions.time_range,
          },
        })
        .then((value) => {
          setSongs(value.data.songs);
          setError(null);
        })
        .catch((err) => {
          setSongs([]);
          setError(err.data.error);
        });
      setUser({ ...session.user, id: "" });
    } else {
      setSongs([]);
      setUser({ name: "no user", id: "" });
    }
  }, [session, songOptions]);
  return { songs, error, user, songOptions, setSongOptions };
}

export { useSpotify };
