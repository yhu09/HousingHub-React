import React, { useState, useEffect, useContext, useCallback } from "react";
import ImageGallery from "react-image-gallery";
import defaultBcg from "../images/house-8.jpeg";
import Hero from "../components/commonHeaders/Hero";
import Banner from "../components/commonHeaders/Banner";
import { Link } from "react-router-dom";
import { HouseContext } from "../context";
import StyledHero from "../components/commonHeaders/StyledHero";
import HouseReviewForm from "../components/house/houseReview/HouseReviewForm";
import HouseReviewList from "../components/house/houseReview/HouseReviewList";
import { uploadFile, getFile, imageLinkURL } from "../utility/s3-upload";
import HouseComments from "../components/house/HouseComments";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImages from "../components/UploadImages";
import { BiBed, BiBath, BiGasPump } from "react-icons/bi";
import { MdLocalLaundryService, MdLocalParking } from "react-icons/md";
import { FaUmbrellaBeach, FaCheck, FaTimes } from "react-icons/fa";
import { BsArrowsExpand } from "react-icons/bs";
import {
  GiHouse,
  GiGrass,
  GiStairs,
  GiWaterDrop,
  GiElectric
} from "react-icons/gi";
import { Button } from "react-bootstrap";

const SingleHouse = props => {
  const context = useContext(HouseContext);
  const { token, isTokenSet, setToken, getHouse } = context;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [slug, setSlug] = useState(props.match.params.slug);
  const [houseAddress, setHouseAddress] = useState(slug.split("-").join(" "));
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [mainImageLink, setMainImageLink] = useState("");
  const [imageLinks, setImageLink] = useState([]);
  const [loadedData, setLoadedData] = useState(false);
  const [edit, setEdit] = useState(false);
  const [averageElectric, setAverageElectric] = useState(null);
  const [averageGas, setAverageGas] = useState(null);
  const [averageWater, setAverageWater] = useState(null);
  const [house, setHouse] = useState();
  const [files, setFiles] = useState([]);

  const fetchToken = useCallback(async () => {
    if (!isTokenSet()) {
      try {
        if (isAuthenticated) {
          let tempToken = await getAccessTokenSilently({
            audience: "http://localhost:3002/"
          });
          setToken(tempToken);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isTokenSet, setToken, isAuthenticated, getAccessTokenSilently]);

  const getHouseInfo = useCallback(async () => {
    function averageUtilities(reviewsData) {
      var sumElectric = 0;
      var sumGas = 0;
      var sumWater = 0;
      var reviewCount = reviewsData.length;
      for (var review of reviewsData) {
        sumElectric += review.elecbill;
        sumGas += review.gasbill;
        sumWater += review.waterbill;
      }
      if (reviewCount !== 0) {
        setAverageElectric(sumElectric / reviewCount);
        setAverageGas(sumGas / reviewCount);
        setAverageWater(sumWater / reviewCount);
      } else {
        setAverageElectric("No reviews");
        setAverageGas("No reviews");
        setAverageWater("No reviews");
      }
    }

    if (isTokenSet()) {
      try {
        await fetch(
          "http://localhost:3002/houses/houseAddress/?houseAddress=" +
            houseAddress,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
          .then(response => response.json())
          .then(data => {
            console.log(data);
            let tempHouse = data[0];
            try {
              setMainImageLink(imageLinkURL(tempHouse.mainphotokey));
              for (let key of tempHouse.photokeys) {
                let original = imageLinkURL(key);
                let thumbnail = imageLinkURL(key);
                imageLinks.push({ original: original, thumbnail: thumbnail });
              }
            } catch (e) {
              console.error(e);
            }
            setHouse(data[0]);
          });
        await fetch(
          "http://localhost:3002/houseReview/houseAddress/?houseAddress=" +
            houseAddress,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
          .then(response => response.json())
          .then(data => {
            setReviews(data);
            averageUtilities(data);
          });

        await fetch(
          "http://localhost:3002/comments/houseAddress/?houseAddress=" +
            houseAddress,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
          .then(response => response.json())
          .then(data => {
            setComments(data);
          });
        setLoadedData(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, [imageLinks, isTokenSet, token, houseAddress]);

  useEffect(() => {
    fetchToken();
    getHouseInfo();
  }, [fetchToken, getHouseInfo]);

  function onEdit() {
    setEdit(true);
  }

  return (
    <div>
      {loadedData ? (
        <>
          <StyledHero img={mainImageLink}>
            <Banner title={`${house.houseaddress}`}>
              <Link to="/houses" className="btn-primary">
                Back to Houses
              </Link>
            </Banner>
          </StyledHero>
          <section className="single-room">
            <div className="single-house-images">
              <ImageGallery
                items={imageLinks}
                showFullscreenButton={true}
                showPlayButton={false}
                showNav={true}
              />
            </div>
            <UploadImages houseAddress={houseAddress} token={token} />
            {edit ? (
              <SingleHouseEdit
                house={house}
                token={token}
                averageElectric={averageElectric}
                averageGas={averageGas}
                averageWater={averageWater}
              />
            ) : (
              <>
                {" "}
                <div className="single-room-info">
                  <article className="desc">
                    <h3>Full Address</h3>
                    <p>
                      {" "}
                      {house.houseaddress}, {house.city}, {house.statename}{" "}
                      {house.zip}{" "}
                    </p>
                    <h3>Contact Info</h3>
                    <p> Landlord Email: {house.landlordemail} </p>
                    <p> Residents Emails: {house.currresidentsemail} </p>
                  </article>
                  <div>
                    <h3>Basic Info</h3>
                    <div className="info">
                      <h6>
                        {" "}
                        <GiHouse /> Rent: ${house.rent}
                      </h6>
                      <h6>
                        {" "}
                        <GiElectric /> Electric: ${averageElectric}
                      </h6>
                      <h6>
                        {" "}
                        <BiGasPump /> Gas: ${averageGas}
                      </h6>
                      <h6>
                        {" "}
                        <GiWaterDrop /> Water: ${averageWater}
                      </h6>
                      <h6>
                        {" "}
                        <BiBed /> Bedrooms: {house.bedrooms}
                      </h6>
                      <h6>
                        {" "}
                        <BiBath /> Bathrooms: {house.bathrooms}
                      </h6>
                      <h6>
                        {" "}
                        <GiStairs /> Basement:{" "}
                        {house.basement ? <FaCheck /> : <FaTimes />}
                      </h6>
                      <h6>
                        {" "}
                        <MdLocalLaundryService /> Laundry:{" "}
                        {house.laundry ? <FaCheck /> : <FaTimes />}
                      </h6>
                      <h6>
                        {" "}
                        <MdLocalParking /> Parking:{" "}
                        {house.parking ? <FaCheck /> : <FaTimes />}
                      </h6>
                      <h6>
                        {" "}
                        <FaUmbrellaBeach /> Porch:{" "}
                        {house.porch ? <FaCheck /> : <FaTimes />}
                      </h6>
                      <h6>
                        {" "}
                        <GiGrass /> Yard:{" "}
                        {house.yard ? <FaCheck /> : <FaTimes />}
                      </h6>
                      <h6>
                        {" "}
                        <BsArrowsExpand /> Floor: {house.unit}
                      </h6>
                    </div>
                  </div>
                  <div>
                    <Button onClick={onEdit} className="room-info-button">
                      Edit House Info
                    </Button>{" "}
                  </div>
                  <br></br>
                </div>
              </>
            )}
          </section>
          <section className="services-center">
            <HouseComments houseAddress={houseAddress} comments={comments} />
            <section>
              {" "}
              <HouseReviewList houseReviews={reviews} />
              <HouseReviewForm houseAddress={houseAddress} />
            </section>
          </section>
        </>
      ) : null}
    </div>
  );
};

const SingleHouseEdit = ({
  house,
  token,
  averageElectric,
  averageGas,
  averageWater
}) => {
  const [landlordEmail, setLandlordEmail] = useState(house.landlordemail);
  const [houseAddress, setHouseAddress] = useState(house.houseaddress);
  const [city, setCity] = useState(house.city);
  const [stateName, setStateName] = useState(house.statename);
  const [zip, setZip] = useState(house.zip);
  const [rent, setRent] = useState(house.rent);
  const [bedrooms, setBedrooms] = useState(house.bedrooms);
  const [bathrooms, setBathrooms] = useState(house.bathrooms);
  const [basement, setBasement] = useState(house.basement);
  const [laundry, setLaundry] = useState(house.laundry);
  const [parking, setParking] = useState(house.parking);
  const [porch, setPorch] = useState(house.porch);
  const [yard, setYard] = useState(house.yard);
  const [unit, setUnit] = useState(house.unit);

  async function onUpdate() {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        landlordEmail: landlordEmail,
        houseAddress: null,
        stateName: null,
        city: null,
        ZIP: null,
        rent: rent,
        unit: unit,
        laundry: laundry,
        basement: basement,
        yard: yard,
        parking: parking,
        porch: porch,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        mainPhotoKey: null,
        photoKeys: null
      })
    };
    try {
      await fetch(
        "http://localhost:3002/houses/houseAddress/?houseAddress=" +
          houseAddress,
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

  return (
    <form onSubmit={onUpdate}>
      {" "}
      <div className="single-room-info">
        <article className="desc">
          <h3>Full Address</h3>
          <p>
            {" "}
            {house.houseaddress}, {house.city}, {house.statename} {house.zip}{" "}
          </p>
          <h3>Contact Info</h3>
          <p>
            {" "}
            Landlord Email:
            <input
              type="text"
              value={landlordEmail}
              onChange={event => setLandlordEmail(event.target.value)}
            />
          </p>
          <p> Residents Emails: {house.currresidentsemail} </p>
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
              <GiElectric /> Electric: ${averageElectric}
            </h6>
            <h6>
              {" "}
              <BiGasPump /> Gas: ${averageGas}
            </h6>
            <h6>
              {" "}
              <GiWaterDrop /> Water: ${averageWater}
            </h6>
            <h6>
              {" "}
              <BiBed /> Bedrooms:{" "}
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
            <h6>
              {" "}
              <GiStairs /> Basement:{" "}
              <input
                type="checkbox"
                value="Basement"
                checked={basement}
                onClick={event => setBasement(!basement)}
              />{" "}
              {basement ? <FaCheck /> : <FaTimes />}
            </h6>
            <h6>
              {" "}
              <MdLocalLaundryService /> Laundry:{" "}
              <input
                type="checkbox"
                value="laundry"
                checked={laundry}
                onClick={event => setLaundry(!laundry)}
              />{" "}
              {laundry ? <FaCheck /> : <FaTimes />}
            </h6>
            <h6>
              {" "}
              <MdLocalParking /> Parking:{" "}
              <input
                type="checkbox"
                value="parking"
                checked={parking}
                onClick={event => setParking(!parking)}
              />{" "}
              {parking ? <FaCheck /> : <FaTimes />}
            </h6>
            <h6>
              {" "}
              <FaUmbrellaBeach /> Porch:{" "}
              <input
                type="checkbox"
                value="porch"
                checked={porch}
                onClick={event => setPorch(!porch)}
              />{" "}
              {porch ? <FaCheck /> : <FaTimes />}
            </h6>
            <h6>
              {" "}
              <GiGrass /> Yard:{" "}
              <input
                type="checkbox"
                value="yard"
                checked={yard}
                onClick={event => setYard(!yard)}
              />{" "}
              {yard ? <FaCheck /> : <FaTimes />}
            </h6>
            <h6>
              {" "}
              <BsArrowsExpand /> Floor:{" "}
              <label>
                <input
                  type="radio"
                  value="floor-upper"
                  checked={unit === "upper"}
                  onClick={event => setUnit("upper")}
                />
                Upper
              </label>
              <label>
                <input
                  type="radio"
                  value="floor-lower"
                  checked={unit === "lower"}
                  onClick={event => setUnit("lower")}
                />
                Lower
              </label>
            </h6>
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
