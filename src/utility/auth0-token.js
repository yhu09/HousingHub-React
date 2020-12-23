import React, { useContext, useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { HouseContext } from "../context";

export const PopulateToken = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const context = useContext(HouseContext);
  const { isTokenSet, setToken } = context;

  const retrieveToken = useCallback(async () => {
    try {
      if (isAuthenticated) {
        console.log("authenticated");
        let token = await getAccessTokenSilently({
          audience: "http://localhost:3002/"
        });
        console.log("token" + token);
        setToken(token);
      }
    } catch (e) {
      console.error(e);
    }
  }, [setToken, isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    retrieveToken();
  }, [retrieveToken]);

  if (!isTokenSet()) {
    retrieveToken();
  }

  return isTokenSet;
};
