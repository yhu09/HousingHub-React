import React, { useContext, useCallback, useEffect } from "react";
import Hero from "../components/commonHeaders/Hero";
import Banner from "../components/commonHeaders/Banner";
import { Link } from "react-router-dom";
import HousesContainer from "../container/HousesContainer";
import { useAuth0 } from "@auth0/auth0-react";
import { HouseContext } from "../context";
import { APIBASE } from "../utility/api-base";

export const Houses = () => {
  const context = useContext(HouseContext);
  const { token, isTokenSet, setToken, setHouses } = context;
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

  const fetchHouses = useCallback(async () => {
    try {
      await fetch(APIBASE + "houses", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setHouses(data);
        });
    } catch (e) {
      console.error(e);
    }
  }, [setHouses, token]);

  useEffect(() => {
    fetchToken();
    fetchHouses();
  }, [fetchToken, fetchHouses]);

  return (
    <>
      <Hero hero="roomsHero">
        <Banner title="Reviewed Houses" subtitle="from actual students">
          <Link to="/" className="btn-primary">
            Home
          </Link>
        </Banner>
      </Hero>
      <HousesContainer />
    </>
  );
};
