import React from "react";
import { Link } from "react-router-dom";
import defaulIMG from "../images/house-2.png";
export default function House({ house }) {
  const { name, slug, images, price } = house;
  return (
    <div className="img-container">
      <img src={images[0] || defaulIMG} alt="single room"></img>
      <div className="price-top">
        <h6> ${price}</h6>
        <p>per month</p>
      </div>
      <Link to={`/houses/${slug}`} className="btn-primary room-link">
        {" "}
        Features{" "}
      </Link>
    </div>
  );
}
