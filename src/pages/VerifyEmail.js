import React from "react";
import Hero from "../components/commonHeaders/Hero";
import Banner from "../components/commonHeaders/Banner";
import { Link } from "react-router-dom";
import LoginButton from "../components/auth0/LoginButton";

const VerifyEmail = () => {
  return (
    <div>
      <Hero hero="defaultHero">
        <Banner
          title="Verify Email"
          subtitle="After signing up, please verify your email. It might take a few minutes."
        >
          <LoginButton text="I have verified my email"> </LoginButton>
        </Banner>
      </Hero>
    </div>
  );
};

export default VerifyEmail;
