import axios from "axios";
import { GetServerSideProps } from "next";
import { FunctionComponent, useEffect, useState } from "react";

interface songOptions {
  limit?: number;
  offset?: number;
  time_range?: string;
}

interface SongsPageProps {
  token?: string;
}

const SongsPage: FunctionComponent<SongsPageProps> = ({ token }) => {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState();
  const [songOptions, setSongOptions] = useState<songOptions>({
    limit: 50,
    offset: 0,
    time_range: "short_term",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/songs", {
        params: {
          token: token,
          limit: songOptions.limit,
          offset: songOptions.offset,
          time_range: songOptions.time_range,
        },
      })
      .then((value) => {
        setSongs(value.data.songs);
      })
      .catch((err) => {
        setError(err.data.error);
      });
  }, [songOptions]);

  if (error) {
    return (
      <>
        <p>{error}</p>
      </>
    );
  }

  return (
    <>
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
      <input
        type="range"
        name="limit"
        id="limit"
        min="0"
        max="50"
        onChange={(event) => {
          setSongOptions({ ...songOptions, limit: Number(event.target.value) });
        }}
      />
      <input
        type="range"
        name="offset"
        id="offset"
        min="0"
        max="49"
        defaultValue="0"
        onChange={(event) => {
          setSongOptions({
            ...songOptions,
            offset: Number(event.target.value),
          });
        }}
      />

      <div>
        {songs.map((song) => (
          <div className="flex flex-row p-1 justify-center items-center">
            <p>{song.name}</p>
            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SongsPageProps> = async (
  context
) => {
  const token = context.query.token as string;
  return { props: { token: token } };
};

export default SongsPage;
