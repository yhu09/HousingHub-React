import React, { useState, useEffect, useContext, useCallback } from "react";
import { Redirect } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { Form } from "semantic-ui-react";
import { SubletContext } from "../subletContext";
import HouseReviewForm from "../components/house/houseReview/HouseReviewForm";
import HouseReviewList from "../components/house/houseReview/HouseReviewList";
import { listFilesInFolder, imageLinkURL } from "../utility/s3-upload";
import HouseComments from "../components/house/HouseComments";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImages from "../components/UploadImages";
import { BiBed, BiBath } from "react-icons/bi";
import { FaUmbrellaBeach, FaCheck, FaTimes, FaRestroom } from "react-icons/fa";
import { BsArrowsExpand, BsFillStarFill } from "react-icons/bs";
import {
  GiHouse,
  GiGrass,
  GiStairs,
  GiWaterDrop,
  GiElectric
} from "react-icons/gi";
import { Button } from "react-bootstrap";
import { APIBASE } from "../utility/api-base";
import noimage from "../images/noimage.jpg";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import SingleMapComponent from "../components/SingleMapComponent";

const SingleSubletter = props => {
  const context = useContext(SubletContext);
  const { token, isTokenSet, setToken } = context;
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [slug, setSlug] = useState(props.match.params.slug);
  const [userSlug, setUserSlug] = useState(props.match.params.user);

  const [houseAddress, setHouseAddress] = useState(slug.split("-").join(" "));
  const [imageLinks, setImageLink] = useState([]);
  const [loadedData, setLoadedData] = useState(false);
  const [edit, setEdit] = useState(false);
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [expDate, setExpDate] = useState(null);
  const [subletter, setSubletter] = useState();

  const fetchToken = useCallback(async () => {
    console.log(props);

    console.log(slug);
    console.log(userSlug);

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

  const getSubletterInfo = useCallback(async () => {
    if (isTokenSet()) {
      try {
        await fetch(
          APIBASE + "subletters/houseAddress/?houseAddress=" + houseAddress,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
          .then(response => response.json())
          .then(async data => {
            let author = data[0].tenant;
            let pictures = await listFilesInFolder(
              "sublet/" + author + "/" + props.match.params.slug + "/"
            );
            let imageContents = pictures.Contents;
            if (imageContents.length === 0) {
              imageLinks.push({ original: noimage, thumbnail: noimage });
            } else {
              for (let imageContent of imageContents) {
                let source = imageLinkURL(imageContent.Key);
                imageLinks.push({ original: source, thumbnail: source });
              }
            }
            let begindate = data[0].begindate.split("T")[0];
            let enddate = data[0].enddate.split("T")[0];
            let expdate = data[0].expiredate.split("T")[0];
            begindate = begindate.split("-");
            enddate = enddate.split("-");
            expdate = expdate.split("-");
            let beginYear = parseInt(begindate[0]);
            let beginMonth = parseInt(begindate[1].replace(/^0+/, ""));
            let beginDay = parseInt(begindate[2].replace(/^0+/, ""));
            let endYear = parseInt(enddate[0]);
            let endMonth = parseInt(enddate[1].replace(/^0+/, ""));
            let endDay = parseInt(enddate[2].replace(/^0+/, ""));
            let expYear = parseInt(expdate[0]);
            let expMonth = parseInt(expdate[1].replace(/^0+/, ""));
            let expDay = parseInt(expdate[2].replace(/^0+/, ""));
            setBeginDate({ day: beginDay, month: beginMonth, year: beginYear });
            setEndDate({ day: endDay, month: endMonth, year: endYear });
            setExpDate({ day: expDay, month: expMonth, year: expYear });
            console.log(data[0]);
            setSubletter(data[0]);
          });
        setLoadedData(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, [imageLinks, isTokenSet, token, houseAddress, props]);

  useEffect(() => {
    fetchToken();
    getSubletterInfo();
  }, [fetchToken, getSubletterInfo]);

  function onEdit() {
    console.log(subletter);
    if (user.name === subletter.tenantemail) {
      setEdit(true);
    } else {
      alert("You do not have permission to edit this");
      setEdit(false);
    }
  }

  async function onDelete() {
    console.log("Delete entry at:" + houseAddress)
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        houseAddress: houseAddress
      })
    };
    try {
      await fetch(
        APIBASE +
        "subletters/houseAddress/?houseAddress=" + houseAddress,
        requestOptions
      )
        .then(response => console.log(response))
    } catch (e) {
      console.error(e);
    }
    var url = "http://localhost:3000/sublet"
    window.location.replace(url);
  }

  return (
    <div>
      {loadedData ? (
        <>
          <div className="house-title">
            <div className="house-address">
              <h1>{`${subletter.houseaddress}`}</h1>
            </div>
            <div className="house-attribute-container">
            </div>
          </div>
          <section className="single-room">
            <div className="single-house-images">
              <ImageGallery
                items={imageLinks}
                showFullscreenButton={true}
                showPlayButton={false}
                showNav={true}
              />
            </div>
            {user.name === subletter.tenantemail ? (
              <UploadImages
                houseAddress={houseAddress}
                type={"subletter"}
                author={user.given_name + " " + user.family_name}
              />
            ) : (
                <></>
              )}
            {/* <UploadImages houseAddress={houseAddress} type={"subletter"} /> */}
            {edit ? (
              <SingleSubletterEdit
                subletter={subletter}
                token={token}
                beginDate={beginDate}
                endDate={endDate}
                expDate={expDate}
              />
            ) : (
                <>
                  {" "}
                  <div className="single-room-info">
                    <article className="desc">
                      <h3>Full Address</h3>
                      <p>
                        {" "}
                        {subletter.houseaddress}, {subletter.city},{" "}
                        {subletter.statename} {subletter.zip}{" "}
                      </p>
                      <h3>Contact Info</h3>
                      <p> Tenant Name: {subletter.tenant} </p>
                      <p> Tenant Email: {subletter.tenantemail} </p>
                      <h3>Sublet Dates</h3>
                    From: <Calendar value={beginDate} />
                    To: <Calendar value={endDate} />
                    </article>
                    <div>
                      <h3>Basic House Info</h3>
                      <div className="info">
                        <h6>
                          {" "}
                          <GiHouse /> Rent: ${subletter.rent}
                        </h6>
                        <h6>
                          {" "}
                          <FaRestroom /> Preferred Gender:{" "}
                          {subletter.preferredgender}
                        </h6>
                        <h6>
                          {" "}
                          <BiBed /> Bedrooms: {subletter.bedrooms}
                        </h6>
                        <h6>
                          {" "}
                          <BiBath /> Bathrooms: {subletter.bathrooms}
                        </h6>
                      </div>
                      <h3>Description</h3>
                      <p>{subletter.description}</p>
                      <h3>Location</h3>
                      <SingleMapComponent
                        latitude={parseFloat(subletter.latitude)}
                        longitude={parseFloat(subletter.longitude)}
                        edit={false}
                      />
                      <h3>Posting Expires On</h3>
                      <Calendar value={expDate} />
                    </div>
                    <div>
                      {user.name === subletter.tenantemail ? (
                        [<Button onClick={onEdit} className="room-info-button">
                          Edit Subletter Info
                      </Button>, <span> </span>,
                        <Button onClick={onDelete}>
                          Delete Post
                      </Button>]
                      ) : (
                          <></>
                        )}
                    </div>
                    <br></br>
                  </div>
                </>
              )}
          </section>
        </>
      ) : null}
    </div>
  );
};

const SingleSubletterEdit = ({
  subletter,
  token,
  beginDate,
  endDate,
  expDate
}) => {
  const [rent, setRent] = useState(subletter.rent);
  const [bedrooms, setBedrooms] = useState(subletter.bedrooms);
  const [bathrooms, setBathrooms] = useState(subletter.bathrooms);
  const [gender, setGender] = useState(subletter.preferredgender);
  const [editBeginDate, setEditBeginDate] = useState(beginDate);
  const [editEndDate, setEditEndDate] = useState(endDate);
  const [editExpDate, setEditExpDate] = useState(expDate);
  const [latitude, setLatitude] = useState(subletter.latitude);
  const [longitude, setLongitude] = useState(subletter.longitude);
  const [description, setDescription] = useState(subletter.description);

  useEffect(() => {
    let formBeginDate =
      '"' +
      editBeginDate.month +
      "/" +
      editBeginDate.day +
      "/" +
      editBeginDate.year +
      '"';
    let formEndDate =
      '"' +
      editEndDate.month +
      "/" +
      editEndDate.day +
      "/" +
      editEndDate.year +
      '"';
    console.log(formBeginDate);
    console.log(formEndDate);
  }, [editBeginDate, editEndDate]);

  async function onUpdate() {
    let formBeginDate =
      editBeginDate.month + "/" + editBeginDate.day + "/" + editBeginDate.year;
    let formEndDate =
      editEndDate.month + "/" + editEndDate.day + "/" + editEndDate.year;
    let formExpDate =
      editExpDate.month + "/" + editExpDate.day + "/" + editExpDate.year;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        houseAddress: null,
        stateName: null,
        city: null,
        ZIP: null,
        rent: rent,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        beginDate: formBeginDate,
        endDate: formEndDate,
        expDate: formExpDate,
        preferredGender: gender,
        latitude: latitude,
        longitude: longitude,
        description: description
      })
    };
    console.log(requestOptions);
    try {
      await fetch(
        APIBASE +
        "subletters/houseAddress/?houseAddress=" +
        subletter.houseaddress,
        requestOptions
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });
    } catch (e) {
      console.error(e);
    }
  }

  function handleGenderChange(e) {
    setGender(e.target.value);
  }

  function fillTextArea(event) {
    setDescription(event.target.value);
  }

  return (
    <form onSubmit={onUpdate}>
      {" "}
      <div className="single-room-info">
        <article className="desc">
          <h3>Full Address</h3>
          <p>
            {" "}
            {subletter.houseaddress}, {subletter.city}, {subletter.statename}{" "}
            {subletter.zip}{" "}
          </p>
          <h3>Contact Info</h3>
          <p> Tenant Name: {subletter.tenant} </p>
          <p> Tenant Email: {subletter.tenantemail} </p>
          <h3>Sublet Dates</h3>
          From: <Calendar value={editBeginDate} onChange={setEditBeginDate} />
          To: <Calendar value={editEndDate} onChange={setEditEndDate} />
        </article>
        <div>
          <h3>Basic Info</h3>
          <div className="info">
            <h6>
              rent:{" "}
              <input
                type="text"
                value={rent}
                onChange={event => setRent(event.target.value)}
              />
            </h6>
            <h6>
              {" "}
              <FaRestroom /> Preferred Gender:{" "}
              <select value={gender} onChange={handleGenderChange}>
                <option name="female">Female</option>
                <option name="male"> Male</option>
                <option name="no preference">No preference</option>
              </select>
            </h6>
            <h6>
              {" "}
              <BiBed /> Bedrooms:
              <input
                type="text"
                size="10"
                value={bedrooms}
                onChange={event => setBedrooms(event.target.value)}
              />
            </h6>
            <h6>
              {" "}
              <BiBath /> Bathrooms:{" "}
              <input
                type="text"
                size="10"
                value={bathrooms}
                onChange={event => setBathrooms(event.target.value)}
              />
            </h6>
          </div>
          <h3>Description</h3>
          <Form.TextArea value={description} onChange={fillTextArea} />
          <h3>Location</h3>
          <SingleMapComponent
            latitude={parseFloat(subletter.latitude)}
            longitude={parseFloat(subletter.longitude)}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            edit={true}
          />
          <h3>Posting Expires On</h3>
          <Calendar value={editExpDate} onChange={setEditExpDate} />
        </div>
        <div>
          <Button block bsSize="large" type="submit">
            Update Sublet Info
          </Button>{" "}
        </div>
        <br></br>
      </div>
    </form>
  );
};

export default SingleSubletter;
