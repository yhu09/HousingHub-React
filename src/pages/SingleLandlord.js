import React, { useState, useEffect, useContext, useCallback } from "react";
import { Form } from "semantic-ui-react";
import { LandlordContext } from "../landlordContext";
import LandlordReviewForm from "../components/landlord/landlordReview/LandlordReviewForm";
import LandlordReviewList from "../components/landlord/landlordReview/LandlordReviewList";
import { useAuth0 } from "@auth0/auth0-react";
import { BiBed, BiBath, BiGasPump } from "react-icons/bi";
import { MdLocalLaundryService, MdLocalParking } from "react-icons/md";
import { FaUmbrellaBeach, FaCheck, FaTimes } from "react-icons/fa";
import {
  BsArrowsExpand,
  BsFillStarFill,
  BsFillPeopleFill
} from "react-icons/bs";
import {
  GiHouse,
  GiGrass,
  GiStairs,
  GiWaterDrop,
  GiElectric
} from "react-icons/gi";
import { Button } from "react-bootstrap";
import { APIBASE } from "../utility/api-base";
import SingleMapComponent from "../components/SingleMapComponent";
import MapComponent from "../components/MapComponent";

const SingleLandlord = props => {
  const context = useContext(LandlordContext);
  const { token, isTokenSet, setToken, getLandlord } = context;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [slug, setSlug] = useState(props.match.params.slug);
  const [landlordName, setLandlordName] = useState(slug.split("-").join(" "));
  const [reviews, setReviews] = useState([]);
  const [houses, setHouses] = useState([]);
  const [loadedData, setLoadedData] = useState(false);
  const [edit, setEdit] = useState(false);
  const [landlord, setLandlord] = useState();
  const [averageStars, setAverageStars] = useState();

  const fetchToken = useCallback(async () => {
    if (!isTokenSet()) {
      try {
        if (isAuthenticated) {
          let tempToken = await getAccessTokenSilently({
            audience: APIBASE
          });
          setToken(tempToken);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isTokenSet, setToken, isAuthenticated, getAccessTokenSilently]);

  const getLandlordInfo = useCallback(async () => {
    function averageStars(reviewsData) {
      var sumStars = 0;
      var reviewCount = reviewsData.length;
      for (var review of reviewsData) {
        sumStars += review.stars;
      }
      if (reviewCount !== 0) {
        setAverageStars(sumStars / reviewCount);
      } else {
        setAverageStars("No reviews");
      }
    }

    if (isTokenSet()) {
      try {
        await fetch(APIBASE + "landlords/landlordName/?name=" + landlordName, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(async data => {
            console.log(data[0]);
            setLandlord(data[0]);
          });

        await fetch(APIBASE + "houses/landlord/?landlord=" + landlordName, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(async data => {
            console.log(data);
            setHouses(data);
          });

        await fetch(
          APIBASE + "landlordReview/landlordName/?name=" + landlordName,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
          .then(response => response.json())
          .then(data => {
            setReviews(data);
            averageStars(data);
          });

        setLoadedData(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, [isTokenSet, token, props]);

  useEffect(() => {
    fetchToken();
    getLandlordInfo();
  }, [fetchToken, getLandlordInfo]);

  function onEdit() {
    setEdit(true);
  }

  return (
    <div>
      {loadedData ? (
        <>
          {edit ? (
            <SingleLandlordEdit
              landlord={landlord}
              token={token}
              averageStars={averageStars}
              reviewLength={reviews.length}
            />
          ) : (
            <>
              <div className="house-title">
                <div className="house-address">
                  <h1>{`${landlord.landlordname}`}</h1>
                </div>
                <div className="house-attribute-container">
                  <span className="house-attribute">
                    {" "}
                    <BsFillStarFill /> {averageStars} {"("}
                    {reviews.length}
                    {")"}
                  </span>
                  <span className="house-attribute" aria-hidden="true">
                    ·
                  </span>
                </div>
              </div>
              <div className="landlord-info">
                <article className="desc">
                  <h3>Contact Info</h3>
                  <p> Landlord Name: {landlord.landlordname} </p>
                  <p> Landlord Email: {landlord.landlordemail} </p>
                  <p> Landlord Number: {landlord.landlordnumber} </p>
                  <h3>Description</h3>
                  <p>{landlord.description}</p>
                </article>
                <div className="landlord-map">
                  <h3>Houses owned by landlord</h3>
                  <MapComponent houses={houses} landlord={true} />
                </div>
                <div className="landlord-edit-button">
                  <Button onClick={onEdit} className="room-info-button">
                    Edit House Info
                  </Button>{" "}
                </div>
                <br></br>
              </div>
            </>
          )}
        </>
      ) : null}
      <section className="services-center">
        <section>
          {" "}
          <LandlordReviewList landlordReviews={reviews} />
          <LandlordReviewForm
            landlordName={landlordName}
            token={token}
            landlordReviews={reviews}
            setLandlordReviews={setReviews}
          />
        </section>
      </section>
    </div>
  );
};

const SingleLandlordEdit = ({
  landlord,
  token,
  averageStars,
  reviewLength
}) => {
  const [landlordEmail, setLandlordEmail] = useState(landlord.landlordemail);
  const [landlordNumber, setLandlordNumber] = useState(landlord.landlordnumber);
  const [description, setDescription] = useState(landlord.description);

  async function onUpdate() {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        landlordName: landlord.landlordname,
        landlordEmail: landlordEmail,
        landlordNumber: landlordNumber,
        description: description
      })
    };
    try {
      await fetch(APIBASE + "landlords/landlordName/", requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });
    } catch (e) {
      console.error(e);
    }
  }

  function fillTextArea(event) {
    setDescription(event.target.value);
  }

  return (
    <form onSubmit={onUpdate}>
      {" "}
      <>
        <div className="house-title">
          <div className="house-address">
            <h1>{`${landlord.landlordname}`}</h1>
          </div>
          <div className="house-attribute-container">
            <span className="house-attribute">
              {" "}
              <BsFillStarFill /> {averageStars} {"("}
              {reviewLength}
              {")"}
            </span>
            <span className="house-attribute" aria-hidden="true">
              ·
            </span>
          </div>
        </div>
        <div className="landlord-info">
          <article className="desc">
            <h3>Contact Info</h3>
            <p> Landlord Name: {landlord.landlordname} </p>
            <p>
              {" "}
              Landlord Email:{" "}
              <input
                type="text"
                value={landlordEmail}
                onChange={event => setLandlordEmail(event.target.value)}
              />
            </p>
            <p>
              {" "}
              Landlord Number:{" "}
              <input
                type="text"
                value={landlordNumber}
                onChange={event => setLandlordNumber(event.target.value)}
              />{" "}
            </p>
            <h3>Description</h3>
            <Form.TextArea value={description} onChange={fillTextArea} />
          </article>
          <div className="landlord-edit-button">
            <Button block bsSize="large" type="submit">
              Update House Info
            </Button>{" "}
          </div>
        </div>
      </>
    </form>
  );
};

export default SingleLandlord;
