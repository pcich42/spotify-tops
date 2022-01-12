import { useSession } from "next-auth/react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Button, Card, Container, Stack, CardImg } from "react-bootstrap";
import { useSpotifySongs } from "../lib/useSpotify";

type SongsProps = {
  options: TopItemsOptions;
};

const Songs: FunctionComponent<SongsProps> = ({ options }) => {
  const { data: session } = useSession();
  const { songs, error: songsError } = useSpotifySongs(session, options);

  if (songsError) {
    return (
      <>
        <h1>Sorry, there was an error with fetching songs</h1>
      </>
    );
  }

  return (
    <>
      <Container className="text-light" style={{ maxWidth: "30rem" }}>
        <h1 className="font-bold py-4">Your top songs</h1>
        <Stack gap={3} className="text-light">
          {songs.map((song, index) => (
            <SongInfo song={song} index={index} />
          ))}
        </Stack>
      </Container>
    </>
  );
};

const SongInfo: FunctionComponent<{
  song: SpotifyApi.TrackObjectFull;
  index: number;
}> = ({ song, index }) => {
  return (
    <>
      <Container>
        <Card className="bg-black" >
          <CardImg
            className="p-2"
            variant="top"
            src={song.album.images.at(1).url}
          ></CardImg>
          <Card.Body>
            <Card.Title>
              <span className="fw-bold">{index + 1 + ": " + song.name}</span>
            </Card.Title>
            <Card.Text>
              {"song artists: "}
              {getArtistsNames(song.artists)}
            </Card.Text>
          </Card.Body>
          <Button
            variant="success"
            className="m-2"
            onClick={() => {
              location.href = song.uri;
            }}
          >
            Play song on spotify
          </Button>
        </Card>
      </Container>
    </>
  );
};

function getArtistsNames(artists: SpotifyApi.ArtistObjectSimplified[]): string {
  return artists
    .map((artist) => artist.name)
    .reduce((prev, next) => `${prev}, ${next}`);
}

export { Songs };
