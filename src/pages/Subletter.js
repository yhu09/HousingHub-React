import React from "react";
import Banner from "../components/commonHeaders/Banner";
import Hero from "../components/commonHeaders/Hero";

export const Subletter = () => {
  return (
    <div>
      <Hero hero="sublettersHero">
        <Banner
          title="Need to sublet or a subletter?"
          subtitle="You've come to the right place!"
        ></Banner>
      </Hero>
    </div>
  );
};
