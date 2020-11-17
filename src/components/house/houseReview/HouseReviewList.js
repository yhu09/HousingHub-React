import React from "react";
import HouseReview from "./HouseReview";
export default function HouseReviewList({ houseReviews }) {
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
