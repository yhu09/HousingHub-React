import React from "react";
import PropTypes from "prop-types";

const HouseReviewList = ({ houseReviews }) => {
  console.log(houseReviews);
  if (houseReviews === null) {
    return <div></div>;
  }
  if (houseReviews.length === 0) {
    return <div></div>;
  }
  return (
    <section className="reviewlist">
      <div className="reviewlist-center">
        {houseReviews.map(item => {
          return <HouseReview key={item.housereviewid} houseReview={item} />;
        })}
      </div>
    </section>
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
    <div className="house-review">
      <h3>Review</h3>
      <article className="review-info">
        <p>Review: {review}</p>
        <p>Stars: {stars} </p>
        <p>Rent: {rent} </p>
        <p>Electric Bill: {elecbill} </p>
        <p>Gas Bill: {gasbill} </p>
        <p>Water Bill: {waterbill} </p>
        <p>Reviewer: {author}</p>
        <p>Date: {createddate}</p>
      </article>
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
