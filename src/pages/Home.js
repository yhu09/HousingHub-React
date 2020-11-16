import React from "react";
import Hero from "../components/commonHeaders/Hero";
import Banner from "../components/commonHeaders/Banner";
import { Link } from "react-router-dom";
import Services from "../components/commonHeaders/Services";
import FeaturedHouses from "../components/house/FeaturedHouses";

export const Home = () => {
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
