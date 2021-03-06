import React, { useState } from "react";
import HousesFilter from "../components/house/HousesFilter";
import HousesList from "../components/house/HousesList";
import MapHousesList from "../components/house/MapHousesList";
import MapComponent from "../components/MapComponent";
import { withHouseConsumer } from "../context";
import Loading from "../components/commonHeaders/Loading";
import { useAuth0 } from "@auth0/auth0-react";

function HousesContainer({ context }) {
  const { loadingHouses, sortedHouses, houses } = context;
  const { isAuthenticated } = useAuth0();

  const [viewMap, setViewMap] = useState(false);

  if (isAuthenticated) {
    if (loadingHouses) {
      return <Loading />;
    }
    return (
      <>
        <HousesFilter
          houses={houses}
          viewMap={viewMap}
          setViewMap={setViewMap}
        />
        {viewMap ? (
          <div className="houses-map-container">
            <div className="houses-list-list">
              <MapHousesList houses={sortedHouses} />
            </div>
            <div className="houses-list-map">
              <MapComponent houses={sortedHouses} />
            </div>
          </div>
        ) : (
          <HousesList houses={sortedHouses} />
        )}
      </>
    );
  } else {
    return (
      <div className="no-result">
        <br></br>
        <h1>Please log in to view house reviews</h1>
      </div>
    );
  }
}

export default withHouseConsumer(HousesContainer);
