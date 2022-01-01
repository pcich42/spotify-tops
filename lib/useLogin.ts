import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useLogin(code: string | undefined): string | undefined {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    if (code) {
      axios
        .get("http://localhost:3000/api/login", { params: { code: code } })
        .then((data) => {
          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);
          setExpiresIn(data.data.expiresIn);
        })
        .catch((err) => {
          console.log("error in useLogin");
          window.location.href = "/";
        });
    }
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    axios
      .get("http://localhost:3000/api/refresh", {
        params: { refreshToken: refreshToken },
      })
      .then((data) => {
        setAccessToken(data.data.accessToken);
        setExpiresIn(data.data.expiresIn);
      })
      .catch((err) => {
        console.log("error refreshing token");
        window.location.href = "/";
      });
  }, [refreshToken, expiresIn]);

  return accessToken;
}
