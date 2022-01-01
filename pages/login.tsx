import Link from "next/link";
import React, { FunctionComponent } from "react";

const LoginPage: FunctionComponent = ({}) => {
  return (
    <>
      <Link href="/">
        <a className=" bg-slate-600 px-9 py-3 inline-block mx-auto">
          Go to home
        </a>
      </Link>
    </>
  );
};

export default LoginPage;
