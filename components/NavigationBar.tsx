import Link from "next/link";
import React, { FunctionComponent } from "react";

interface NavigationBarProps {
  url: string;
  accessToken: string;
}

const NavigationBar: FunctionComponent<NavigationBarProps> = ({
  url,
  accessToken,
}) => {
  return (
    <>
      <Link href={url}>
        <a className=" bg-slate-600 px-9 py-3 inline-block m-10">
          Go to Login page
        </a>
      </Link>
      <Link href="/artists">
        <a className=" bg-slate-600 px-9 py-3 inline-block m-10"> Artists</a>
      </Link>
      <Link href={`/songs?token=${accessToken}`}>
        <a className=" bg-slate-600 px-9 py-3 inline-block m-10"> Songs</a>
      </Link>
    </>
  );
};

export default NavigationBar;
