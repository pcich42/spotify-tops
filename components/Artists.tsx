import { useSession } from "next-auth/react";
import { FunctionComponent } from "react";
import { useSpotifyArtists } from "../lib/useSpotify";

type ArtistsProps = {
  options: TopItemsOptions;
};

const Artists: FunctionComponent<ArtistsProps> = ({options}) => {
  const { data: session } = useSession();
  const { artists, error: artistsError } = useSpotifyArtists(session, options);

  if (artistsError) {
    return (
      <>
        <h1>Sorry, there was an error with fetching artists</h1>
      </>
    );
  }

  return (
    <>
      <div className="mx-5 text-light">
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
    </>
  );
};

export { Artists };
