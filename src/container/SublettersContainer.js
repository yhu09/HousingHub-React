import React, { useState } from "react";
import SubletList from "../components/subletter/SubletList";
import SubletFilter from "../components/subletter/SubletFilter";
import MapComponent from "../components/MapComponent";
import MapSublettersList from "../components/subletter/MapSublettersList";
import { withSubletConsumer } from "../subletContext";
import Loading from "../components/commonHeaders/Loading";
import { useAuth0 } from "@auth0/auth0-react";

function SublettersContainer({ context }) {
  const { loadingSubletters, sortedSubletters, subletters } = context;
  const { isAuthenticated } = useAuth0();

  const [viewMap, setViewMap] = useState(false);

  if (isAuthenticated) {
    if (loadingSubletters) {
      return <Loading />;
    }
    return (
      <>
        <SubletFilter
          subletters={subletters}
          viewMap={viewMap}
          setViewMap={setViewMap}
        />
        {viewMap ? (
          <div className="houses-map-container">
            <div className="houses-list-list">
              <MapSublettersList subletters={sortedSubletters} />
            </div>
            <div className="houses-list-map">
              <MapComponent subletters={sortedSubletters} />
            </div>
          </div>
        ) : (
          <SubletList subletters={sortedSubletters} />
        )}
      </>
    );
  } else {
    return (
      <div className="no-result">
        <br></br>
        <h1>Please log in to view subletters listings</h1>
      </div>
    );
  }
}

export default withSubletConsumer(SublettersContainer);
