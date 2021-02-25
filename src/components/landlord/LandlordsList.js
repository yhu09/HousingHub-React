import React, { useContext } from "react";
import Landlord from "./Landlord";
import { LandlordContext } from "../../landlordContext";

const LandlordsList = ({ landlords }) => {
  const context = useContext(LandlordContext);

  if (landlords.length === 0) {
    return (
      <div className="no-result">
        <br></br>
        <h3>No landlords matched with search parameters</h3>
      </div>
    );
  }
  return (
    <section className="landlordlist">
      <div className="landlordlists-center">
        {landlords.map((item, index) => {
          return <Landlord key={index} landlord={item} />;
        })}
      </div>
    </section>
  );
};
export default LandlordsList;
