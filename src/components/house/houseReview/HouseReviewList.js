import React from "react";
import PropTypes from "prop-types";

const HouseReviewList = ({ houseReviews }) => {
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
          return <HouseReview houseReview={item} />;
        })}
      </div>
    </section>
  );
}

function HouseReview({ houseReview }) {
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
    <div class="house-review">
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
}

HouseReview.propTypes = {
  houseReview: PropTypes.shape({
    stars: PropTypes.number.isRequired,
    rent: PropTypes.number.isRequired,
    elecBill: PropTypes.number.isRequired,
    gasBill: PropTypes.number.isRequired,
    waterBill: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired
  })
};

export default HouseReviewList
