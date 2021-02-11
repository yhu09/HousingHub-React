import React, { useState, useEffect, useContext, useCallback } from "react";
import Hero from "../components/commonHeaders/Hero";
import Banner from "../components/commonHeaders/Banner";
import { Link } from "react-router-dom";
import Services from "../components/commonHeaders/Services";
import FeaturedHouses from "../components/house/FeaturedHouses";
import { useAuth0 } from "@auth0/auth0-react";
import { HouseContext } from "../context";
import { APIBASE } from "../utility/api-base";

export const Home = () => {
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
      console.log(token);
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
    async function fetchData() {
      await fetchToken();
      await fetchHouses();
    }
    fetchData();
  }, [fetchToken, fetchHouses]);

  return (
    <>
      <Hero hero="defaultHero">
        <Banner
          title="Tufts Housing Hub"
          subtitle="Find houses near campus reviewed by previous Tufts students"
        >
          <Link to="/houses" className="btn-primary">
            Checkout the houses
          </Link>
        </Banner>
      </Hero>
      <Services />
      {/* <FeaturedHouses /> */}
    </>
  );
};
