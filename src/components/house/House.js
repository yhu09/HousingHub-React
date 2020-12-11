import React from "react";
import { Link } from "react-router-dom";
import defaulIMG from "../../images/house-2.png";
import PropTypes from "prop-types";
import { imageLinkURL } from "../../utility/s3-upload";

export default function House({ house }) {
  const { houseaddress, slug, mainphotokey, rent } = house;
  let imageLink = imageLinkURL(mainphotokey);
  return (
    <article>
      <div className="img-container">
        <img src={imageLink || defaulIMG} alt="single room"></img>
        <div className="price-top">
          <h6> ${rent}</h6>
          <p>per month</p>
        </div>
        <Link to={`/houses/${slug}`} className="btn-primary room-link">
          {" "}
          Features{" "}
        </Link>
      </div>
      <p className="room-info"> {houseaddress} </p>
    </article>
  );
}

House.propTypes = {
  house: PropTypes.shape({
    houseaddress: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    mainphotokey: PropTypes.string.isRequired,
    rent: PropTypes.number.isRequired
  })
};
