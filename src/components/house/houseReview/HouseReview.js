import React from "react";
import PropTypes from "prop-types";

export default function HouseReview({ houseReview }) {
  const {
    stars,
    rent,
    elecbill,
    gasbill,
    waterbill,
    review,
    email
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
        <p>Reviewer: {email}</p>
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
