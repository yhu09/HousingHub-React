import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { GiHouse, GiWaterDrop, GiElectric } from "react-icons/gi";
import { BiGasPump } from "react-icons/bi";
import { Rating } from "semantic-ui-react";

const HouseReviewList = ({ landlordReviews }) => {
  console.log(landlordReviews);
  if (landlordReviews === null) {
    return <div></div>;
  }
  if (landlordReviews.length === 0) {
    return <div></div>;
  }
  return (
    <>
      <div className="review-header">
        <h3>Review</h3>
      </div>
      <div className="reviewlist-center">
        {landlordReviews.map(item => {
          return (
            <LandlordReview key={item.housereviewid} landlordReview={item} />
          );
        })}
      </div>
    </>
  );
};

const calendar = {
  "01": "January",
  "02": "Feburary",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December"
};

const LandlordReview = ({ landlordReview }) => {
  const [date, setDate] = useState("");
  const { stars, rent, review, author, createddate } = landlordReview;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function formatDate() {
    let dateArr = createddate.split("-", 2);
    let year = dateArr[0];
    let monthNum = dateArr[1];
    var monthAlp = calendar[monthNum];
    setDate(monthAlp + " " + year);
  }

  useEffect(() => {
    // formatDate();
  }, [formatDate]);

  return (
    <div className="review-box">
      <div className="review-stat">
        {/* <h6>
          {" "}
          <GiHouse /> Rent: ${rent}
        </h6>
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
        </h6> */}
        <Rating icon="star" defaultRating={stars} maxRating={5} disabled />
      </div>
      <div className="review-credentials">
        <p>
          {author} <br></br>
          <span className="review-date">{date}</span>
        </p>
      </div>
      <div className="review-review">
        <p>{review}</p>
      </div>
      <br></br>
    </div>
  );
};

LandlordReview.propTypes = {
  landlordReview: PropTypes.shape({
    stars: PropTypes.number.isRequired,
    rent: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired
  })
};

export default HouseReviewList;
