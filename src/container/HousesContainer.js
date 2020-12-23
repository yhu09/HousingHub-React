import React from "react";
import HousesFilter from "../components/house/HousesFilter";
import HousesList from "../components/house/HousesList";
import MapComponent from "../components/MapComponent";
import { withHouseConsumer } from "../context";
import Loading from "../components/commonHeaders/Loading";
import { useAuth0 } from "@auth0/auth0-react";

function HousesContainer({ context }) {
  const { loading, sortedHouses, houses } = context;
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    if (loading) {
      return <Loading />;
    }
    return (
      <>
        <MapComponent></MapComponent>
        <HousesFilter houses={houses} />
        <HousesList houses={sortedHouses} />
      </>
    );
  } else {
    return <h1>Please log in to access featured houses</h1>;
  }
}

export default withHouseConsumer(HousesContainer);
