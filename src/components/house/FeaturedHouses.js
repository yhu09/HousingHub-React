import React, { useContext } from "react";
import { HouseContext } from "../../context";
import Loading from "../commonHeaders/Loading";
import House from "../house/House";
import Title from "../commonHeaders/Title";
import { useAuth0 } from "@auth0/auth0-react";

const FeaturedHouses = () => {
  const context = useContext(HouseContext);
  let { loading, houses } = context;
  const { isAuthenticated } = useAuth0();

  houses = houses.map((house, index) => {
    return <House key={index} house={house} />;
  });

  if (isAuthenticated) {
    return (
      <section className="featured-rooms">
        <Title title="featured" />
        <div className="featured-rooms-center">
          {loading ? <Loading /> : houses}
        </div>
      </section>
    );
  } else {
    return (
      <section className="featured-rooms">
        <Title title="featured" />
        <div className="featured-rooms-center">
          <h1>Please log in to access this feature</h1>
        </div>
      </section>
    );
  }
};

export default FeaturedHouses;
