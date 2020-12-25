import React, { useState } from "react";
import { Link } from "react-router-dom";
import defaulIMG from "../../images/house-2.png";
import PropTypes from "prop-types";
import { imageLinkURL } from "../../utility/s3-upload";
import ImageGallery from "react-image-gallery";

const House = ({ house }) => {
  const [imageLinks, setImageLink] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const {
    houseaddress,
    slug,
    mainphotokey,
    photokeys,
    rent,
    bedrooms,
    bathrooms
  } = house;
  let imageLink = imageLinkURL(mainphotokey);
  if (!loaded) {
    for (let key of photokeys) {
      let original = imageLinkURL(key);
      let thumbnail = imageLinkURL(key);
      imageLinks.push({ original: original, thumbnail: thumbnail });
    }
    setLoaded(true);
  }

  return (
    <article>
      {/* <div className="img-container"> */}
      {/* <img src={imageLink || defaulIMG} alt="single room"></img> */}
      <div className="thumbnail">
        <ImageGallery
          items={imageLinks}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          showBullets={true}
          showNav={true}
        />
      </div>
      <div className="price-top">
        <h6> ${rent}</h6>
        <p>per month</p>
      </div>
      {/* <Link to={`/houses/${slug}`} className="btn-primary room-link">
          {" "}
          Features{" "}
        </Link> */}
      {/* </div> */}
      <p className="room-info">
        {houseaddress} <br></br>
        Bedrooms: {bedrooms} <br></br>
        Bathrooms: {bathrooms} <br></br>
        <Link to={`/houses/${slug}`} className="btn-primary">
          {" "}
          Check it out!{" "}
        </Link>
      </p>
    </article>
  );
};
export default House;

House.propTypes = {
  house: PropTypes.shape({
    houseaddress: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    mainphotokey: PropTypes.string.isRequired,
    rent: PropTypes.number.isRequired
  })
};
