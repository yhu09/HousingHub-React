import React, { useState, useEffect, useContext, useCallback } from "react";
import Hero from "../components/commonHeaders/Hero";
import Banner from "../components/commonHeaders/Banner";
import { Link } from "react-router-dom";
import Services from "../components/commonHeaders/Services";
import FeaturedHouses from "../components/house/FeaturedHouses";
import { useAuth0 } from "@auth0/auth0-react";
import { HouseContext } from "../context";

export const Home = () => {
  const context = useContext(HouseContext);
  const { token, isTokenSet, setToken, setHouses } = context;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const fetchToken = useCallback(async () => {
    if (!isTokenSet()) {
      try {
        if (isAuthenticated) {
          let tempToken = await getAccessTokenSilently({
            audience: "http://localhost:3002/"
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
      await fetch("http://localhost:3002/houses", {
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
    //React Fragment
    <>
      <Hero hero="defaultHero">
        <Banner title="Nice House!" subtitle="It will cost you $10 a month">
          <Link to="/houses" className="btn-primary">
            Checkout our reviews
          </Link>
        </Banner>
      </Hero>
      <Services />
      <FeaturedHouses />
    </>
  );
};
