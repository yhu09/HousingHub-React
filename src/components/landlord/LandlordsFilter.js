import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { HouseContext } from "../../context";
import Title from "../commonHeaders/Title";
import SearchBar from "material-ui-search-bar";

const LandlordsFilter = ({ landlords }) => {
  const context = useContext(HouseContext);
  const { handleSearchInput } = context;
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    handleSearchInput(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <section className="filter-container">
      <Title title="search landlords"></Title>
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
      {/* <form className="filter-form">
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
        </div>
      </form> */}
    </section>
  );
};

export default LandlordsFilter;
