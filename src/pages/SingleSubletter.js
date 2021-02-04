import React, { useState, useEffect, useContext, useCallback } from "react";
import ImageGallery from "react-image-gallery";
import { SubletContext } from "../subletContext";
import HouseReviewForm from "../components/house/houseReview/HouseReviewForm";
import HouseReviewList from "../components/house/houseReview/HouseReviewList";
import { listFilesInFolder, imageLinkURL } from "../utility/s3-upload";
import HouseComments from "../components/house/HouseComments";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImages from "../components/UploadImages";
import { BiBed, BiBath, BiGasPump } from "react-icons/bi";
import { MdLocalLaundryService, MdLocalParking } from "react-icons/md";
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

const SingleHouse = props => {
  const context = useContext(SubletContext);
  const { token, isTokenSet, setToken, getHouse } = context;
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const [slug, setSlug] = useState(props.match.params.slug);
  const [houseAddress, setHouseAddress] = useState(slug.split("-").join(" "));
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [imageLinks, setImageLink] = useState([]);
  const [loadedData, setLoadedData] = useState(false);
  const [edit, setEdit] = useState(false);
  const [averageElectric, setAverageElectric] = useState(null);
  const [averageGas, setAverageGas] = useState(null);
  const [averageWater, setAverageWater] = useState(null);
  const [beginDate, setBeginDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [subletter, setSubletter] = useState();
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
            begindate = begindate.split("-");
            enddate = enddate.split("-");
            let beginYear = parseInt(begindate[0]);
            let beginMonth = parseInt(begindate[1].replace(/^0+/, ""));
            let beginDay = parseInt(begindate[2].replace(/^0+/, ""));
            let endYear = parseInt(enddate[0]);
            let endMonth = parseInt(enddate[1].replace(/^0+/, ""));
            let endDay = parseInt(enddate[2].replace(/^0+/, ""));
            setBeginDate({ day: beginDay, month: beginMonth, year: beginYear });
            setEndDate({ day: endDay, month: endMonth, year: endYear });
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

  return (
    <div>
      {loadedData ? (
        <>
          <div className="house-title">
            <div className="house-address">
              <h1>{`${subletter.houseaddress}`}</h1>
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
              {/* <span className="house-attribute"> Close to Picantes </span> */}
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
            {(user.name === subletter.tenantemail) ? <UploadImages houseAddress={houseAddress} type={"subletter"} /> : <></>}
            {/* <UploadImages houseAddress={houseAddress} type={"subletter"} /> */}
            {edit ? (
              <SingleSubletterEdit
                subletter={subletter}
                token={token}
                beginDate={beginDate}
                endDate={endDate}
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
                      <p></p>
                      <h3>Location</h3>
                      <SingleMapComponent
                        latitude={parseFloat(subletter.latitude)}
                        longitude={parseFloat(subletter.longitude)}
                        edit={false}
                      />
                    </div>
                    <div>
                      {(user.name === subletter.tenantemail) ? <Button onClick={onEdit} className="room-info-button">
                        Edit Subletter Info
                    </Button> : <></>}
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

const SingleSubletterEdit = ({ subletter, token, beginDate, endDate }) => {
  const [rent, setRent] = useState(subletter.rent);
  const [bedrooms, setBedrooms] = useState(subletter.bedrooms);
  const [bathrooms, setBathrooms] = useState(subletter.bathrooms);
  const [gender, setGender] = useState(subletter.preferredgender);
  const [editBeginDate, setEditBeginDate] = useState(beginDate);
  const [editEndDate, setEditEndDate] = useState(endDate);
  const [latitude, setLatitude] = useState(subletter.latitude);
  const [longitude, setLongitude] = useState(subletter.longitude);

  async function onUpdate() {
    let formBeginDate =
      editBeginDate.month + "/" + editBeginDate.day + "/" + editBeginDate.year;
    let formEndDate =
      editEndDate.month + "/" + editEndDate.day + "/" + editEndDate.year;
    console.log(formBeginDate);
    console.log(formEndDate);
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
        preferredGender: gender,
        latitude: latitude,
        longitude: longitude
      })
    };
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
            <SingleMapComponent
              latitude={parseFloat(subletter.latitude)}
              longitude={parseFloat(subletter.longitude)}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              edit={true}
            />
          </div>
        </div>
        <div>
          <button block bsSize="large" type="submit">
            Update House Info
          </button>{" "}
        </div>
        <br></br>
      </div>
    </form>
  );
};

export default SingleHouse;
