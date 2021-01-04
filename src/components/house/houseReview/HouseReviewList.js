import React from "react";
import PropTypes from "prop-types";
import { GiHouse, GiWaterDrop, GiElectric } from "react-icons/gi";
import { BiGasPump } from "react-icons/bi";
import { Rating } from "semantic-ui-react";

const HouseReviewList = ({ houseReviews }) => {
  console.log(houseReviews);
  if (houseReviews === null) {
    return <div></div>;
  }
  if (houseReviews.length === 0) {
    return <div></div>;
  }
  return (
    <>
      <div className="review-header">
        <h3>Review</h3>
      </div>
      <div className="reviewlist-center">
        {houseReviews.map(item => {
          return <HouseReview key={item.housereviewid} houseReview={item} />;
        })}
      </div>
    </>
  );
};

const HouseReview = ({ houseReview }) => {
  const {
    stars,
    rent,
    elecbill,
    gasbill,
    waterbill,
    review,
    author,
    createddate
  } = houseReview;

  return (
    <div className="review-box">
      <div className="review-stat">
        <h6>
          {" "}
          <GiHouse /> Rent: ${rent}</h6>
        <h6>
          {" "}
          <GiElectric /> Electric: ${elecbill}
        </h6>
        <h6>
          {" "}
          <BiGasPump /> Gas: ${gasbill}
        </h6>
        <h6>
          {" "}
          <GiWaterDrop /> Water: ${waterbill}
        </h6>
        <Rating icon="star" defaultRating={stars} maxRating={5} disabled />
      </div>
      <div className="review-credentials">
        <p>
          {author} <br></br>
          {createddate}
        </p>
      </div>
      <div className="review-review">
        <p>{review}</p> 
      </div>
      {/* <article className="review-info">
        <p>
          Reviewer: {author}
          <br></br>
          Date: {createddate}
          <br></br>
          Stars: {stars}
          <br></br>
          Review: {review} <br></br>
        </p>
      </article> */}
      <br></br>
    </div>
  );
};

HouseReview.propTypes = {
  houseReview: PropTypes.shape({
    stars: PropTypes.number.isRequired,
    rent: PropTypes.number.isRequired,
    elecbill: PropTypes.number.isRequired,
    gasbill: PropTypes.number.isRequired,
    waterbill: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired
  })
};

export default HouseReviewList;
