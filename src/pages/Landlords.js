import React, { useContext, useCallback, useEffect } from "react";
import Hero from "../components/commonHeaders/Hero";
import Banner from "../components/commonHeaders/Banner";
import { Link } from "react-router-dom";
import LandlordsContainer from "../container/LandlordsContainer";
import { useAuth0 } from "@auth0/auth0-react";
import { HouseContext } from "../context";
import { APIBASE } from "../utility/api-base";

export const Landlords = () => {
  const context = useContext(HouseContext);
  const { token, isTokenSet, setToken } = context;
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
        .then(data => {});
    } catch (e) {
      console.error(e);
    }
  }, [token]);

  useEffect(() => {
    fetchToken();
    fetchHouses();
  }, [fetchToken, fetchHouses]);

  return (
    <>
      <Hero hero="roomsHero">
        <Banner title="Landlord Reviews" subtitle="from actual students">
          <Link to="/" className="btn-primary">
            Home
          </Link>
        </Banner>
      </Hero>
      <LandlordsContainer />
    </>
  );
};
