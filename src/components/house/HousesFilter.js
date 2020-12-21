import React from "react";
import { useContext } from "react";
import { HouseContext } from "../../context";
import Title from "../commonHeaders/Title";

 const HousesFilter = ({ houses }) => {
  const context = useContext(HouseContext);
  const {
    handleChange,
    bedrooms,
    rent
  } = context;

  const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
  };

  // get unique types
  let bedroomsUnique = getUnique(houses, "bedrooms");

  bedroomsUnique = ["all", ...bedroomsUnique];

  bedroomsUnique = bedroomsUnique.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });

  return (
    <section className="filter-container">
      <Title title="search rooms"></Title>
      <form className="filter-form">
        <div className="form-group">
          <label htmlFor="bedrooms">bedrooms</label>
          <select
            name="bedrooms"
            id="bedrooms"
            value={bedrooms}
            className="form-control"
            onChange={handleChange}
          >
            {bedroomsUnique}
          </select>
        </div>
      </form>
    </section>
  );
}

export default HousesFilter