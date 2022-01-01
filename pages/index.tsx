import { GetServerSideProps } from "next";
import React, { FunctionComponent } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import NavigationBar from "../components/NavigationBar";
import { credentials, scopes } from "../lib/spotify_api";
import useLogin from "../lib/useLogin";

const Home: FunctionComponent<UrlProps> = ({ url, code }) => {
  const accessToken = useLogin(code);

  return (
    <div className="items-center">
      <NavigationBar url={url} accessToken={accessToken}></NavigationBar>
      <p>{accessToken}</p>
      <main>{/* main section with most played artists or songs */}</main>
    </div>
  );
};

interface UrlProps {
  url: string;
  code?: string;
}

export const getServerSideProps: GetServerSideProps<UrlProps> = async (
  context
) => {
  const code = (context.query.code as string) ?? null;
  const api = new SpotifyWebApi(credentials);
  const url = api.createAuthorizeURL(scopes, "state");

  return { props: { url: url, code: code } };
};

export default Home;
