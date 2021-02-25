import React, { useState } from "react";
import { withLandlordConsumer } from "../landlordContext";
import Loading from "../components/commonHeaders/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import LandlordsList from "../components/landlord/LandlordsList";
import LandlordsFilter from "../components/landlord/LandlordsFilter";

function LandlordsContainer({ context }) {
  const { loadingLandlords, sortedLandlords, landlords } = context;
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    if (loadingLandlords) {
      return <Loading />;
    }
    return (
      <>
        <LandlordsFilter landlords={landlords} />
        <LandlordsList landlords={sortedLandlords} />
      </>
    );
  } else {
    return (
      <div className="no-result">
        <br></br>
        <h1>Please log in to view landlord reviews</h1>
      </div>
    );
  }
}

export default withLandlordConsumer(LandlordsContainer);
