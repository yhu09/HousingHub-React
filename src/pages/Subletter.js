import React, { useContext, useCallback, useEffect } from "react";
import Banner from "../components/commonHeaders/Banner";
import Hero from "../components/commonHeaders/Hero";
import SublettersContainer from "../container/SublettersContainer";
import { useAuth0 } from "@auth0/auth0-react";
import { SubletContext } from "../subletContext";
import { APIBASE } from "../utility/api-base";

export const Subletter = () => {
  const context = useContext(SubletContext);
  const { token, isTokenSet, setToken, setSubletters } = context;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const fetchToken = useCallback(async () => {
    if (!isTokenSet()) {
      try {
        if (isAuthenticated) {
          let tempToken = await getAccessTokenSilently({
            audience: APIBASE
          });
          setToken(tempToken);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isTokenSet, setToken, isAuthenticated, getAccessTokenSilently]);

  const fetchSubletters = useCallback(async () => {
    try {
      await fetch(APIBASE + "subletters", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setSubletters(data);
        });
    } catch (e) {
      console.error(e);
    }
  }, [setSubletters, token]);

  useEffect(() => {
    fetchToken();
    fetchSubletters();
  }, [fetchToken, fetchSubletters]);

  return (
    <div>
      <Hero hero="sublettersHero">
        <Banner title="Available Subletters"></Banner>
      </Hero>
      <SublettersContainer />
    </div>
  );
};
