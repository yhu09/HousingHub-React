import React from "react";
import { useContext } from "react";
import { HouseContext } from "../../context";
import Title from "../commonHeaders/Title";

const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};
export default function HousesFilter({ houses }) {
  const context = useContext(HouseContext);
  const {
    handleChange,
    bedrooms,
    rent
    // type,
    // capacity,
    // price,
    // minPrice,
    // maxPrice,
    // minSize,
    // maxSize,
    // breakfast,
    // pets
  } = context;

  // get unique types
  let bedroomsUnique = getUnique(houses, "bedrooms");
  //
  bedroomsUnique = ["all", ...bedroomsUnique];

  bedroomsUnique = bedroomsUnique.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });

  //   let people = getUnique(houses, "capacity");
  //   people = people.map((item, index) => {
  //     return (
  //       <option key={index} value={item}>
  //         {item}
  //       </option>
  //     );
  //   });
  return (
    <section className="filter-container">
      <Title title="search rooms"></Title>
      <form className="filter-form">
        {/* room type*/}
        {/* <div className="form-group">
          <label htmlFor="type"> room type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={handleChange}
          >
            {types}
          </select>
        </div> */}
        {/*room type end */}

        {/*number of people*/}
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
        {/*number of people end*/}
      </form>
    </section>
  );
}
