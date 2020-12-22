import React from "react";
import House from "./House";
const HousesList = ({ houses }) => {
  if (houses.length === 0) {
    return (
      <div>
        <h3>No houses matched with search parameters</h3>
      </div>
    );
  }
  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {houses.map((item, index) => {
          return <House key={index} house={item} />;
        })}
      </div>
    </section>
  );
};
export default HousesList;
