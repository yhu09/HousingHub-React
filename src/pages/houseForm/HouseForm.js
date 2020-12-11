import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";
import "./HouseForm.css";
import { uploadFile, getFile } from "../../utility/s3-upload";

export const HouseForm = () => {
  const [landlordEmail, setLandlordEmail] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [ZIP, setZIP] = useState("");
  const [unitLevel, setUnitLevel] = useState("lower");
  const [laundry, setLaundry] = useState(false);
  const [basement, setBasement] = useState(false);
  const [yard, setYard] = useState(false);
  const [parking, setParking] = useState(false);
  const [porch, setPorch] = useState(false);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [rent, setRent] = useState(875);
  const [files, setFiles] = useState([]);
  const [mainPhotoFile, setMainPhotoFile] = useState([]);
  const [photoKeys, setPhotoKeys] = useState([]);

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

    let slug = houseAddress.split(" ").join("-");
    let path = slug + "/";

    // main image
    console.log(mainPhotoFile);
    let key = uploadFile(path, mainPhotoFile[0]);
    var mainPhotoKey = path + key;
    console.log(mainPhotoKey);

    // other images
    var imagePathKey;
    for (var file of files) {
      let key = uploadFile(path, file);
      imagePathKey = path + key;
      setPhotoKeys(photoKeys.push(imagePathKey));
    }

    var requestOptions = {
      method: "POST",
<<<<<<< HEAD
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        landlordEmail: landlordEmail,
        houseAddress: houseAddress,
        stateName: state,
        city: city,
        ZIP: ZIP,
        rent: rent,
        unitLevel: unitLevel,
        laundry: laundry,
        basement: basement,
        yard: yard,
        parking: parking,
        porch: porch,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        mainPhotoKey: mainPhotoKey,
        photoKeys: photoKeys
      })
=======
      body: formData,
      "Content-Type": "application/x-www-form-urlencoded"
>>>>>>> 3aafea79d78d304c0f395261f23eeb70dfee1a5b
    };
    await fetch("http://localhost:3002/houses", requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          setNewHouse(true);
        }
      });
    console.log("House form submitted");
  }

  function fileSelectedHandler(e) {
    setFiles([...files, ...e.target.files]);
  }

  function frontPhotoSelectedHandler(e) {
    setMainPhotoFile([...e.target.files]);
  }

  function renderNewHouseStatus() {
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

          <Form.Group controlId="formGridAddress">
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

          <Form.Group as={Col} controlId="formGridRent">
            <Form.Label>Rent</Form.Label>
            <Form.Control
              placeholder="875"
              onChange={e => setRent(e.target.value)}
              value={rent}
            ></Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridUnitLevel">
            <Form.Label>Unit Level</Form.Label>
            <Form.Control
              as="select"
              defaultValue="lower"
              onChange={e => setUnitLevel(e.target.value)}
              value={unitLevel}
            >
              <option>lower</option>
              <option>upper</option>
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

          <Form.Group as={Col} controlId="formGridPorch">
            <Form.Label>Porch</Form.Label>
            <Form.Control
              as="select"
              defaultValue="false"
              onChange={e => setPorch(e.target.value)}
              value={porch}
            >
              <option>true</option>
              <option>false</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBedrooms">
            <Form.Label>Bedrooms</Form.Label>
            <Form.Control
              as="select"
              defaultValue="1"
              onChange={e => setBedrooms(e.target.value)}
              value={bedrooms}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBathrooms">
            <Form.Label>Bathrooms</Form.Label>
            <Form.Control
              as="select"
              defaultValue="1"
              onChange={e => setBathrooms(e.target.value)}
              value={bathrooms}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formPhotos">
            <Form.Label>Front Photo</Form.Label>
            <input type="file" multiple onChange={frontPhotoSelectedHandler} />
          </Form.Group>

          <Form.Group as={Col} controlId="formPhotos">
            <Form.Label>Photos</Form.Label>
            <input type="file" multiple onChange={fileSelectedHandler} />
          </Form.Group>

          <br></br>

          <Button block bsSize="large" disabled={!validateForm()} type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="HouseForm">
      {newHouse === null ? renderForm() : renderNewHouseStatus()}
    </div>
  );
};

class ImageUpload extends React.Component {
  state = {
    files: []
  };

  fileSelectedHandler = e => {
    this.setState({ files: [...this.state.files, ...e.target.files] });
  };

  render() {
    return (
      <form>
        <div>
          <h2>Upload images</h2>
        </div>
        <h3>Images</h3>
        <input type="file" multiple onChange={this.fileSelectedHandler} />
      </form>
    );
  }
}
