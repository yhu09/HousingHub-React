import React, { useState } from "react";
import { Link } from "react-router-dom";
import defaulIMG from "../../images/house-2.png";
import PropTypes from "prop-types";
import { imageLinkURL } from "../../utility/s3-upload";
import ImageGallery from "react-image-gallery";
import StarRatings from "react-star-ratings";

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
    <div className="box">
      <div className="thumbnail">
        <ImageGallery
          items={imageLinks}
          showThumbnails={false}
          showFullscreenButton={false}
          showPlayButton={false}
          showBullets={true}
          showNav={false}
          disableKeyDown={true}
        />
      </div>
      <div className="price-top">
        <h6> ${rent}</h6>
        <p>per month</p>
      </div>
      <div className="room-info">
        <div className="room-info-address">{houseaddress}</div>
        <div className="room-info-button">
          <Link to={`/houses/${slug}`} className="btn-primary">
            {" "}
            Link{" "}
          </Link>
        </div>
        <div className="room-info-rating">
          <StarRatings
            numberOfStars={5}
            rating={2}
            starDimension="15px"
            starSpacing="1px"
            starRatedColor="blue"
          />
        </div>
        <div className="room-info-info">
          Bedrooms: {bedrooms}
          <br></br>
          Bathrooms: {bathrooms}
        </div>
      </div>
    </div>
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
