import React from "react";
import { Link } from "react-router-dom";
import defaulIMG from "../../images/house-2.png";
import PropTypes from "prop-types";
export default function House({ house }) {
  const { name, slug, images, price } = house;
  return (
    <article>
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
      <p className="room-info"> {name} </p>
    </article>
  );
}

House.propTypes = {
  house: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired
  })
};
