import { useSession } from "next-auth/react";
import { FunctionComponent, useState } from "react";
import { useSpotifyArtists, useSpotifySongs } from "../lib/useSpotify";

const SongsPage: FunctionComponent = () => {
  const { data: session } = useSession();

  const [options, setOptions] = useState({
    limit: 50,
    offset: 0,
    time_range: "short_term",
  });
  const { songs, error: songsError } = useSpotifySongs(session, options);
  const { artists, error: artistsError } = useSpotifyArtists(session, options);
  const [which, setWhich] = useState<"songs" | "artists">("artists");

  if (songsError || artistsError) {
    return (
      <>
        <p>{songsError}</p>
        <p>{artistsError}</p>
      </>
    );
  }

  const username = session?.user?.name;

  return (
    <>
      <button
        className="bg-green-400 rounded p-2 mx-5"
        onClick={() => {
          setWhich(which === "songs" ? "artists" : "songs");
        }}
      >
        change to {which === "songs" ? "artists" : "songs"}
      </button>
      {username || "no user"}
      <select
        name="time_range"
        id="time_range"
        className="m-10 p-2"
        onChange={(event) => {
          setOptions({ ...options, time_range: event.target.value });
        }}
      >
        <option value="short_term" defaultValue="true">
          Short
        </option>
        <option value="medium_term">Medium</option>
        <option value="long_term">Long</option>
      </select>

      {which === "songs" ? (
        <div className="mx-5">
          <h1 className="font-bold">Your top songs</h1>
          {songs.map((song, index) => (
            // <div className="flex flex-row p-1 justify-center items-center">
            <div>
              <p>
                {index + 1 + ": song name: "}
                <span className="font-bold">{song.name}</span>
              </p>
              {"song artists: "}
              <p>{getArtistsNames(song.artists)}</p>
              <p>{song.uri}</p>
              <br />
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-5">
          <h1 className="font-bold">Your top artists</h1>
          {artists.map((artist, index) => (
            <div>
              <p>
                {index + 1 + ": artists name: "}
                <span className="font-bold">{artist.name}</span>
              </p>
              <br />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

function getArtistsNames(artists: SpotifyApi.ArtistObjectSimplified[]): string {
  return artists
    .map((artist) => artist.name)
    .reduce((prev, next) => `${prev}, ${next}`);
}

export default SongsPage;
