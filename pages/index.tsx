import { useSession } from "next-auth/react";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import {
  Button,
  Col,
  Container,
  FormSelect,
  Nav,
  Navbar,
  NavbarBrand,
  Row,
} from "react-bootstrap";
import { Artists } from "../components/Artists";
import { Songs } from "../components/Songs";

const SongsPage: FunctionComponent = () => {
  const { data: session } = useSession();

  const [options, setOptions] = useState<TopItemsOptions>({
    limit: 50,
    offset: 0,
    time_range: "short_term",
  });

  const [which, setWhich] = useState<"songs" | "artists">("artists");

  const username = session?.user?.name;

  if (!session?.user) {
    return (
      <>
        <Button variant="secondary">
          <Link href="api/auth/signin">
            <a> Please log in</a>
          </Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <div className="bg-dark">
        <Navbar bg="success" variant="dark">
          <Container>
            <Nav className="me-auto">
              <NavbarBrand href="#">Spotify Tops</NavbarBrand>
              <Navbar.Text> {username || "no user"}</Navbar.Text>
            </Nav>
          </Container>
        </Navbar>
        <Container className="mx-auto">
          <Row>
            <Col>
              {/* <Container className="w-50">
              </Container> */}
                <Button
                  variant="success m-2"
                  onClick={() => {
                    setWhich(which === "songs" ? "artists" : "songs");
                  }}
                >
                  change to {which === "songs" ? "artists" : "songs"}
                </Button>
                <FormSelect
                  onChange={(event) => {
                    const new_time_range = event.target.value as
                      | "short_term"
                      | "medium_term"
                      | "long_term";
                    setOptions({ ...options, time_range: new_time_range });
                  }}
                >
                  <option value="short_term" defaultValue="true">
                    Short
                  </option>
                  <option value="medium_term">Medium</option>
                  <option value="long_term">Long</option>
                </FormSelect>
            </Col>
            <Col lg={8}>
              {which === "songs" ? (
                <Songs options={options} />
              ) : (
                <Artists options={options} />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SongsPage;
