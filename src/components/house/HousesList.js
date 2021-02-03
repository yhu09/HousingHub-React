import React, { useContext } from "react";
import House from "./House";
import { HouseContext } from "../../context";

const HousesList = ({ houses }) => {
  const context = useContext(HouseContext);
  const { handleHover } = context;

  function handleMouseHover(house) {
    console.log(house);
    handleHover(house);
  }

  if (houses.length === 0) {
    return (
      <div className="no-result">
        <br></br>
        <h3>No houses matched with search parameters</h3>
      </div>
    );
  }
  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {houses.map((item, index) => {
          return (
            <House
              key={index}
              onMouseEnter={handleMouseHover(item)}
              house={item}
            />
          );
        })}
      </div>
    </section>
  );
};
export default HousesList;
