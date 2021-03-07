import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defaulIMG from "../../images/house-2.png";
import PropTypes from "prop-types";
import { listFilesInFolder, imageLinkURL } from "../../utility/s3-upload";
import ImageGallery from "react-image-gallery";
import StarRatings from "react-star-ratings";
import noimage from "../../images/noimage.jpg";

const Landlord = ({ landlord }) => {
  const [loaded, setLoaded] = useState(false);
  const [numReviews, setNumReviews] = useState(0);
  const [stars, setStars] = useState();

  console.log(landlord);
  const {
    landlordname,
    landlordemail,
    landlordnumber,
    description,
    reviewratings
  } = landlord;
  const slug = landlordname.replace(" ", "-");
  useEffect(() => {
    function calculateAverageRating() {
      let numberOfReviews = reviewratings ? reviewratings.length : 0;
      let reviewNum = numberOfReviews ? numberOfReviews : "No reviews";
      setNumReviews(reviewNum);
      if (numberOfReviews === 0) {
        setStars(0);
      } else {
        let sum = 0;
        for (var i = 0; i < numberOfReviews; i++) {
          sum = sum + reviewratings[i];
        }
        let average = sum / numberOfReviews;
        setStars(average);
      }
    }

    calculateAverageRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="landlord-box">
      <div className="landlord-box-info">
        <div className="landlord-info-name">
          <h7>{landlordname}</h7>
          {stars !== undefined ? (
            <div className="landlord-info-rating">
              <StarRatings
                numberOfStars={5}
                rating={stars}
                starDimension="15px"
                starSpacing="1px"
                starRatedColor="blue"
              />{" "}
              ({numReviews})
            </div>
          ) : null}
          <div className="landlord-credential">
            <p>Email: {landlordemail}</p>
            <p>Number: {landlordnumber}</p>
          </div>
        </div>
        <div className="landlord-description">
          <h6>Description:</h6>
          {description == undefined ? (<p>No description at this moment</p>) : (<p>{description.substring(0, 30)}...</p>)}
          <div style={{ paddingLeft: "5px" }}>
          <Link to={`/landlords/${slug}`} className="btn-primary">
            {" "}
            Link{" "}
          </Link>
          </div>
        </div>
      </div>
    </div>
    // <div className="box">
    //   <div className="thumbnail">
    //     <ImageGallery
    //       items={imageLinks}
    //       showThumbnails={false}
    //       showFullscreenButton={false}
    //       showPlayButton={false}
    //       showBullets={true}
    //       showNav={false}
    //       disableKeyDown={true}
    //     />
    //   </div>
    //   <div className="price-top">
    //     <h6> ${rent}</h6>
    //     <p>per month</p>
    //   </div>
    //   <div className="room-info">
    //     <div className="room-info-address">{houseaddress}</div>
    //     <div className="room-info-button">
    //       <Link to={`/houses/${slug}`} className="btn-primary">
    //         {" "}
    //         Link{" "}
    //       </Link>
    //     </div>
    //     {stars !== undefined ? (
    //       <div className="room-info-rating">
    //         <StarRatings
    //           numberOfStars={5}
    //           rating={stars}
    //           starDimension="15px"
    //           starSpacing="1px"
    //           starRatedColor="blue"
    //         />{" "}
    //         ({numReviews})
    //       </div>
    //     ) : null}
    //     <div className="room-info-info">
    //       Bedrooms: {bedrooms}
    //       <br></br>
    //       Bathrooms: {bathrooms}
    //     </div>
    //   </div>
    // </div>
  );
};
export default Landlord;

// House.propTypes = {
//   house: PropTypes.shape({
//     houseaddress: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
//     rent: PropTypes.number.isRequired
//   })
// };
