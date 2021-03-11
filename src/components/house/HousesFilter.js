import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { HouseContext } from "../../context";
import Title from "../commonHeaders/Title";
import SearchBar from "material-ui-search-bar";
import { ToggleButton } from "@material-ui/lab";
import { FaMapMarkedAlt } from "react-icons/fa";

const HousesFilter = ({ houses, viewMap, setViewMap }) => {
  const context = useContext(HouseContext);
  const {
    handleChange,
    handleSearchInput,
    bedrooms,
    bathrooms,
    stars,
    reviewratings,
    rent,
    laundry,
    basement,
    yard,
    parking,
    porch,
    minRent,
    maxRent,
    minSize,
    maxSize
  } = context;
  const [searchValue, setSearchValue] = useState("");

  const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
  };

  // get unique types
  let bedroomsUnique = getUnique(houses, "bedrooms");
  bedroomsUnique = [...bedroomsUnique];

  bedroomsUnique = bedroomsUnique.map((item, index) => {
    return (
      <option value={item} key={index}>
        {item}
      </option>
    );
  });

  useEffect(() => {
    handleSearchInput(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <section className="filter-container">
      <Title title="search houses"></Title>
      <div className="filter-form">
        <SearchBar
          value={searchValue}
          onChange={newValue => {
            setSearchValue(newValue);
          }}
          onRequestSearch={() => handleSearchInput(searchValue)}
        />
      </div>
      <br></br>
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
        <div className="form-group">
          <label htmlFor="rent">rent ${rent}</label>
          <input
            type="range"
            name="rent"
            id="rent"
            value={rent}
            min={minRent}
            max={maxRent}
            onChange={handleChange}
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="bedroom">bedroom rage</label>
          <div className="size-input">
            <input
              type="number"
              name="minSize"
              id="bedroom-min"
              value={minSize}
              onChange={handleChange}
              className="size-input"
            ></input>
            <input
              type="number"
              name="maxSize"
              id="bedroom-max"
              value={maxSize}
              onChange={handleChange}
              className="size-input"
            ></input>
          </div>
        </div>
        {/*}<div className="form-group">
          <label htmlFor="stars">{stars} stars</label>
          <input
            type="range"
            name="stars"
            id="stars"
            value={stars}
            min="0"
            max="5"
            onChange={handleChange}
            className="form-control"
          ></input>
        </div>*/}
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="laundry"
              id="laundry"
              checked={laundry}
              onChange={handleChange}
            />
            <label htmlFor="laundry">laundry</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="porch"
              id="porch"
              checked={porch}
              onChange={handleChange}
            />
            <label htmlFor="porch">porch</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="parking"
              id="parking"
              checked={parking}
              onChange={handleChange}
            />
            <label htmlFor="parking">parking</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="yard"
              id="yard"
              checked={yard}
              onChange={handleChange}
            />
            <label htmlFor="yard">yard</label>
          </div>
        </div>
        <ToggleButton
          className="map-toggle-button"
          value="check"
          selected={viewMap}
          onChange={() => {
            setViewMap(!viewMap);
          }}
        >
          <FaMapMarkedAlt />
        </ToggleButton>
      </form>
    </section>
  );
};

export default HousesFilter;
