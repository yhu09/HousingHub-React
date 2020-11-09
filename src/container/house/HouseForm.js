import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";
import "./HouseForm.css";

export const HouseForm = () => {
  const [landlordEmail, setLandlordEmail] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [ZIP, setZIP] = useState("");
  const [numUnits, setNumUnits] = useState(0);
  const [laundry, setLaundry] = useState(false);
  const [basement, setBasement] = useState(false);
  const [yard, setYard] = useState(false);
  const [parking, setParking] = useState(false);

  const history = useHistory();
  const [newHouse, setNewHouse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      landlordEmail.length > 0 &&
      houseAddress.length > 0 &&
      city.length > 0 &&
      ZIP.length > 0
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        landlordEmail: landlordEmail,
        houseAddress: houseAddress,
        stateName: state,
        city: city,
        ZIP: ZIP,
        numUnits: numUnits,
        laundry: laundry,
        basement: basement,
        yard: yard,
        parking: parking
      })
    };
    await fetch("http://localhost:3002/houses", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
  }

  function renderConfirmationForm() {
    return <div>Successful</div>;
  }

  function renderForm() {
    return (
      <div className="HouseForm">
        <form onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="formGridEmail" bsSize="large">
            <Form.Label>Landlord Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="land.lord@example.com"
              onChange={e => setLandlordEmail(e.target.value)}
              value={landlordEmail}
            />
          </Form.Group>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="123 Boston Ave"
              onChange={e => setHouseAddress(e.target.value)}
              value={houseAddress}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                placeholder="Medford"
                onChange={e => setCity(e.target.value)}
                value={city}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Massachusetts"
                onChange={e => setState(e.target.value)}
                value={state}
              >
                <option>New York</option>
                <option>Massachusetts</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                placeholder="12345"
                onChange={e => setZIP(e.target.value)}
                value={ZIP}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group as={Col} controlId="formGridNumUnits">
            <Form.Label>Number of Units</Form.Label>
            <Form.Control
              as="select"
              defaultValue="1"
              onChange={e => setNumUnits(e.target.value)}
              value={numUnits}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLaundry">
            <Form.Label>Laundry</Form.Label>
            <Form.Control
              as="select"
              defaultValue="false"
              onChange={e => setLaundry(e.target.value)}
              value={laundry}
            >
              <option>true</option>
              <option>false</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBasement">
            <Form.Label>Basement</Form.Label>
            <Form.Control
              as="select"
              defaultValue="false"
              onChange={e => setBasement(e.target.value)}
              value={basement}
            >
              <option>true</option>
              <option>false</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridYard">
            <Form.Label>Yard</Form.Label>
            <Form.Control
              as="select"
              defaultValue="false"
              onChange={e => setYard(e.target.value)}
              value={yard}
            >
              <option>true</option>
              <option>false</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridParking">
            <Form.Label>Parking</Form.Label>
            <Form.Control
              as="select"
              defaultValue="false"
              onChange={e => setParking(e.target.value)}
              value={parking}
            >
              <option>true</option>
              <option>false</option>
            </Form.Control>
          </Form.Group>

          <Button block bsSize="large" disabled={!validateForm()} type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="HouseForm">
      {newHouse === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
};
