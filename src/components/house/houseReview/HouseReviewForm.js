import React, { Component, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./HouseReviewForm.css";
import cookie from "react-cookies";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { APIBASE } from "../../../utility/api-base";

const HouseReviewForm = ({
  houseAddress,
  token,
  houseReviews,
  setHouseReviews
}) => {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [rent, setRent] = useState(0);
  const [elecBill, setElecBill] = useState(0);
  const [gasBill, setGasBill] = useState(0);
  const [waterBill, setWaterBill] = useState(0);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const { user } = useAuth0();

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function handleSubmit(event) {
    let author = user.given_name + " " + user.family_name;

    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        house: houseAddress,
        stars: stars,
        review: review,
        rent: rent,
        elecBill: elecBill,
        gasBill: gasBill,
        waterBill: waterBill,
        author: author
      })
    };
    console.log(requestOptions);
    await fetch(APIBASE + "houseReview", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

    requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        reviewRating: stars
      })
    };
    console.log(author);
    console.log(requestOptions);
    await fetch(
      APIBASE + "houses/addReviewRating?houseAddress=" + houseAddress,
      requestOptions
    )
      .then(response => response.json())
      .then(data => console.log(data));

    console.log("House Review Form submitted");
    setReadyToSubmit(false);
    await sleep(2000);
  }

  Survey.StylesManager.applyTheme("winterstone");

  let json = {
    showQuestionNumbers: "off",
    elements: [
      {
        type: "panel",
        name: "create-review",
        elements: [
          {
            type: "boolean",
            name: "status_of_form_completion_boolean",
            title: "Would you like to create a review?",
            isRequired: true,
            labelTrue: "Yes",
            labelFalse: "No"
          },
          {
            type: "panel",
            name: "review-panel",
            visibleIf: "{status_of_form_completion_boolean} = true",
            title: "House Review:",
            hasOther: true,
            elements: [
              {
                type: "rating",
                name: "rating",
                isRequired: true,
                ratingTheme: "fontawesome-stars",
                title: "Overall experience living in the House",
                choices: ["1", "2", "3", "4", "5"]
              },
              {
                type: "text",
                name: "rent",
                isRequired: true,
                title: "Rent per month",
                inputType: "number"
              },
              {
                type: "text",
                name: "electric",
                isRequired: true,
                title: "Electricity per month",
                inputType: "number"
              },
              {
                type: "text",
                name: "gas",
                isRequired: true,
                title: "Gas per month",
                inputType: "number"
              },
              {
                type: "text",
                name: "water",
                isRequired: true,
                title: "Water per month",
                inputType: "number"
              },
              {
                type: "comment",
                name: "review",
                title: "Review"
              }
            ],
            otherText: "Other, specific:"
          },
          {
            visibleIf: "{status_of_form_completion_boolean} = false",
            title: "Enjoy the website"
          }
        ],
        startWithNewLine: false,
        showNumber: false,
        showCompletedPage: false,
        showQuestionNumbers: "off"
      }
    ]
  };

  var survey = new Survey.Model(json);

  survey.onComplete.add(function(result) {
    console.log(result.data);
    if (result.data.status_of_form_completion_boolean == true) {
      setStars(result.data.rating);
      setGasBill(result.data.gas);
      setWaterBill(result.data.water);
      setRent(result.data.rent);
      setElecBill(result.data.electric);
      setReview(result.data.review);
      setReadyToSubmit(true);
    }
  });

  useEffect(() => {
    if (readyToSubmit) {
      handleSubmit();
      window.location.reload(true);
    }
  }, [readyToSubmit]);

  return (
    <div align="left">
      <Survey.Survey
        model={survey}
        showCompletedPage={false}
        allowImagesPreview={true}
      />
    </div>
  );
};

export default HouseReviewForm;
