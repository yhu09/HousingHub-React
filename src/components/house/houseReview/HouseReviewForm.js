import React, { Component, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import "./HouseReviewForm.css";
import cookie from "react-cookies";

const HouseReivewForm = props => {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [rent, setRent] = useState(0);
  const [elecBill, setElecBill] = useState(0);
  const [gasBill, setGasBill] = useState(0);
  const [waterBill, setWaterBill] = useState(0);

  function validateForm() {
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    let email = cookie.load("email");
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        house: props.houseAddress,
        stars: stars,
        review: review,
        rent: rent,
        elecBill: elecBill,
        gasBill: gasBill,
        waterBill: waterBill,
        author: email
      })
    };
    await fetch("http://localhost:3002/houseReview", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

    console.log("House Review Form submitted");

    window.location.reload(true);
  }

  function renderNewHouseStatus() {
    return <div>Successful</div>;
  }

  function renderForm() {
    return (
      <div className="HouseReviewForm">
        <form onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="formGridBathrooms">
            <Form.Label>Stars</Form.Label>
            <Form.Control
              as="select"
              defaultValue="1"
              onChange={e => setStars(e.target.value)}
              value={stars}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridElectric">
            <Form.Label>Review</Form.Label>
            <textarea
              value={review}
              onChange={e => setReview(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridElectric">
            <Form.Label>Electric per Month</Form.Label>
            <Form.Control
              placeholder="25"
              onChange={e => setElecBill(e.target.value)}
              value={elecBill}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridGas">
            <Form.Label>Gas per Month</Form.Label>
            <Form.Control
              placeholder="25"
              onChange={e => setGasBill(e.target.value)}
              value={gasBill}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridWater">
            <Form.Label>Water per Month</Form.Label>
            <Form.Control
              placeholder="25"
              onChange={e => setWaterBill(e.target.value)}
              value={waterBill}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridRent">
            <Form.Label>Rent</Form.Label>
            <Form.Control
              placeholder="875"
              onChange={e => setRent(e.target.value)}
              value={rent}
            ></Form.Control>
          </Form.Group>

          <Button block disabled={!validateForm()} type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }

  return <div className="HouseReviewForm">{renderForm()}</div>;
};

export default HouseReivewForm;
