import React from "react";
import Sublet from "./Sublet";
const MapSublettersList = ({ subletters }) => {
  if (subletters.length === 0) {
    return (
      <div className="no-result">
        <br></br>
        <h3>No subletters matched with search parameters</h3>
      </div>
    );
  }
  return (
    <section className="roomslist-map">
      <div className="roomslist-center-map">
        {subletters.map((item, index) => {
          return <Sublet key={index} sublet={item} />;
        })}
      </div>
    </section>
  );
};
export default MapSublettersList;
