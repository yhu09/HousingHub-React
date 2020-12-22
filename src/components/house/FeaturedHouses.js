import React, { useContext } from "react";
import { HouseContext } from "../../context";
import Loading from "../commonHeaders/Loading";
import House from "../house/House";
import Title from "../commonHeaders/Title";

const FeaturedHouses = () => {
  const context = useContext(HouseContext);
  let { loading, houses } = context;

  houses = houses.map((house, index) => {
    return <House key={index} house={house} />;
  });

  return (
    <section className="featured-rooms">
      <Title title="featured" />
      <div className="featured-rooms-center">
        {loading ? <Loading /> : houses}
      </div>
    </section>
  );
};

export default FeaturedHouses;
