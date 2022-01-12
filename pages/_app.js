import React from "react";
import { SessionProvider } from "next-auth/react";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps}/>
    </SessionProvider>
  );
}

export default MyApp;
