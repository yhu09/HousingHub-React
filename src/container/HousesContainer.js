import React, { useState } from "react";
import HousesFilter from "../components/house/HousesFilter";
import HousesList from "../components/house/HousesList";
import MapComponent from "../components/MapComponent";
import { withHouseConsumer } from "../context";
import Loading from "../components/commonHeaders/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { ToggleButton } from "@material-ui/lab";
import { FaMapMarkedAlt } from "react-icons/fa";

function HousesContainer({ context }) {
  const { loading, sortedHouses, houses } = context;
  const { isAuthenticated } = useAuth0();

  const [viewMap, setViewMap] = useState(false);

  if (isAuthenticated) {
    if (loading) {
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
              <HousesList houses={sortedHouses} />
            </div>
            <div className="houses-list-map">
              <MapComponent />
            </div>
          </div>
        ) : (
          <HousesList houses={sortedHouses} />
        )}
      </>
    );
  } else {
    return <h1>Please log in to access featured houses</h1>;
  }
}

export default withHouseConsumer(HousesContainer);
