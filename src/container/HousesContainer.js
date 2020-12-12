import React from "react";
import HousesFilter from "../components/house/HousesFilter";
import HousesList from "../components/house/HousesList";
import MapComponent from "../components/MapComponent";
import { withHouseConsumer } from "../context";
import Loading from "../components/commonHeaders/Loading";

function HousesContainer({ context }) {
  const { loading, sortedHouses, houses } = context;
  if (loading) {
    return <Loading />;
  }
  console.log(sortedHouses);
  return (
    <>
      <MapComponent></MapComponent>
      <HousesFilter houses={houses} />
      <HousesList houses={sortedHouses} />
    </>
  );
}

export default withHouseConsumer(HousesContainer);
