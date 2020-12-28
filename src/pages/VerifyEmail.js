import React from "react";
import Hero from "../components/commonHeaders/Hero";
import Banner from "../components/commonHeaders/Banner";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  return (
    <div>
      <Hero hero="defaultHero">
        <Banner
          title="Verify Email"
          subtitle="After signing up, please verify your email and then press the Log In button. It might take a few minutes."
        >
          <Link to="/" className="btn-primary">
            {" "}
            Home{" "}
          </Link>
        </Banner>
      </Hero>
    </div>
  );
};

export default VerifyEmail;
