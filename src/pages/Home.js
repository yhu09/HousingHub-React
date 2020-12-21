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
  const { setHouses } = context;
  const { getAccessTokenSilently } = useAuth0();

  const [housesState, setStateHouses] = useState();

  const fetchHouses = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: "http://localhost:3002/",
        scope: "read:houses"
      });
      console.log(token);
      await fetch("http://localhost:3002/houses", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setStateHouses(data);
          setHouses(data);
        });
    } catch (e) {
      console.error(e);
    }
  }, [setHouses, getAccessTokenSilently]);

  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);

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
