import { FunctionComponent } from "react";
import { useSpotify } from "../lib/useSpotify";

const SongsPage: FunctionComponent = () => {
  const { songs, error, user, songOptions, setSongOptions } = useSpotify();

  if (error) {
    return (
      <>
        <p>{error}</p>
      </>
    );
  }

  return (
    <>
      {user?.name}
      <select
        name="time_range"
        id="time_range"
        className="m-10"
        onChange={(event) => {
          setSongOptions({ ...songOptions, time_range: event.target.value });
        }}
      >
        <option value="short_term" defaultValue="true">
          Short
        </option>
        <option value="medium_term">Medium</option>
        <option value="long_term">Long</option>
      </select>

      <div>
        {songs.map((song, index) => (
          // <div className="flex flex-row p-1 justify-center items-center">
          <div>
            {index}
            <p>{"song name: " + song.name}</p>
            {"song artists: "}
            {song.artists.map((artist) => (
              <p>{artist.name}</p>
            ))}
            <p>{song.uri}</p>
            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export default SongsPage;
