import React, { useContext } from "react";
import { HouseContext } from "../../context";
import Loading from "../commonHeaders/Loading";
import House from "../house/House";
import Title from "../commonHeaders/Title";

// export default class FeaturedHouses extends Component {
//   static contextType = HouseContext;
//   render() {
//     let { loading, houses } = this.context;
//     console.log(houses);
//     houses = houses.map(house => {
//       return <House key={house.id} house={house} />;
//     });

//     return (
//       <section className="featured-rooms">
//         <Title title="featured" />
//         <div className="featured-rooms-center">
//           {loading ? <Loading /> : houses}
//         </div>
//       </section>
//     );
//   }
// }

const FeaturedHouses = () => {
  const context = useContext(HouseContext);
  let { loading, houses } = context;

  houses = houses.map(house => {
    return <House key={house.id} house={house} />;
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
