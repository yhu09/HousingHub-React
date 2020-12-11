import React from "react";
import House from "./House";
export default function HousesList({ houses }) {
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
        {houses.map(item => {
          return <House house={item} />;
        })}
      </div>
    </section>
  );
}
