import React from "react";
import Hero from "../components/commonHeaders/Hero";
import Banner from "../components/commonHeaders/Banner";
import { Link } from "react-router-dom";
import HousesContainer from "../container/HousesContainer";

export const Houses = () => {
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
