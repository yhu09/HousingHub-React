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

const SingleHouse = props => {
  const context = useContext(HouseContext);
  const { token, isTokenSet, setToken, getHouse } = context;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  // constructor(props) {
  //   super(props);
  //   console.log(this.props);
  //   this.state = {
  //     slug: this.props.match.params.slug,
  //     houseAddress: "",
  //     reviews: null,
  //     comments: null,
  //     loaded: false,
  //     defaultBcg
  //   };
  // }
  const [slug, setSlug] = useState(props.match.params.slug);
  const [houseAddress, setHouseAddress] = useState(slug.split("-").join(" "));
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [mainImageLink, setMainImageLink] = useState("");
  const [imageLinks, setImageLink] = useState([]);
  const [loadedData, setLoadedData] = useState(false);
  const [edit, setEdit] = useState(false);
  const [house, setHouse] = useState();

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
    console.log("edit");
    setEdit(true);
  }
  // const {
  //   averageElecBill,
  //   averageGasBill,
  //   averageWaterBill,
  //   basement,
  //   bathrooms,
  //   bedrooms,
  //   city,
  //   currresidentsemail,
  //   houseaddress,
  //   houseid,
  //   landlordemail,
  //   laundry,
  //   // leaseend,
  //   // leasestart,
  //   parking,
  //   porch,
  //   rent,
  //   statename,
  //   unit,
  //   yard,
  //   zip,
  //   photokeys,
  //   mainphotokey
  // } = house;

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
            <ImageGallery items={imageLinks} />
            {edit ? (
              <SingleHouseEdit house={house} />
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
                    {/* <br></br> */}
                    <h3>Contact Info</h3>
                    <p> Landlord Email: {house.landlordemail} </p>
                    <p> Residents Emails: {house.currresidentsemail} </p>
                  </article>
                  <article className="info">
                    <h3>info</h3>
                    <h6>rent: ${house.rent}</h6>
                    <h6>bedrooms: {house.bedrooms}</h6>
                    <h6>bathrooms: {house.bathrooms}</h6>
                    <h6>{house.basement ? "Basement" : "No basement"}</h6>
                    <h6>{house.laundry ? "Laundry" : "No laundry"}</h6>
                    <h6>
                      {house.parking ? "Parking space" : "No parking space"}
                    </h6>
                    <h6>{house.porch ? "Porch" : "No porch"}</h6>
                    <h6>{house.yard ? "Yard" : "No yard"}</h6>
                    <h6>Floor: {house.unit}</h6>
                  </article>
                  <button onClick={onEdit}>Edit</button>{" "}
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

// render() {
//   const { getHouse } = this.context;
//   console.log(this.state.slug);
//   const house = getHouse(this.state.slug);
//   console.log(house);

//   if (!house) {
//     return (
//       <div className="error">
//         {" "}
//         <h3>House Not Found</h3>
//         <Link to="/houses" className="btn-primary">
//           {" "}
//           back to rooms
//         </Link>{" "}
//       </div>
//     );
//   }

//   const {
//     averageElecBill,
//     averageGasBill,
//     averageWaterBill,
//     basement,
//     bathrooms,
//     bedrooms,
//     city,
//     currresidentsemail,
//     houseaddress,
//     houseid,
//     landlordemail,
//     laundry,
//     leaseend,
//     leasestart,
//     parking,
//     porch,
//     rent,
//     statename,
//     unit,
//     yard,
//     slug,
//     zip,
//     photokeys,
//     mainphotokey
//   } = house;

//   // const [mainImg, ...defaultImg] = images;
//   let mainImageLink = imageLinkURL(mainphotokey);
//   console.log(photokeys);
//   let imageLinks = [];
//   for (let key of photokeys) {
//     console.log(key);
//     let original = imageLinkURL(key);
//     let thumbnail = imageLinkURL(key);
//     imageLinks.push({ original: original, thumbnail: thumbnail });
//   }

//   console.log(imageLinks);
//   return (
//     <div>
//       {this.state.loaded ? (
//         <>
//           <StyledHero img={mainImageLink}>
//             <Banner title={`${houseaddress}`}>
//               <Link to="/houses" className="btn-primary">
//                 Back to Houses
//               </Link>
//             </Banner>
//           </StyledHero>
//           <section className="single-room">
//             <ImageGallery items={imageLinks} />
//             <div className="single-room-info">
//               <article className="desc">
//                 <h3>Full Address</h3>
//                 <p>
//                   {" "}
//                   {houseaddress}, {city}, {statename} {zip}{" "}
//                 </p>
//                 <br></br>
//                 <h3>Contact Info</h3>
//                 <p> Landlord Email: {landlordemail} </p>
//                 <p> Residents Emails: {currresidentsemail} </p>
//               </article>
//               <article className="info">
//                 <h3>info</h3>
//                 <h6>rent: ${rent}</h6>
//                 <h6>bedrooms: {bedrooms}</h6>
//                 <h6>bathrooms: {bathrooms}</h6>
//                 <h6>{basement ? "Basement" : "No basement"}</h6>
//                 <h6>{laundry ? "Laundry" : "No laundry"}</h6>
//                 <h6>{parking ? "Parking space" : "No parking space"}</h6>
//                 <h6>{porch ? "Porch" : "No porch"}</h6>
//                 <h6>{yard ? "Yard" : "No yard"}</h6>
//                 <h6>Floor: {unit}</h6>
//               </article>
//             </div>
//           </section>
//           <section className="services-center">
//             <HouseComments
//               houseAddress={this.state.houseAddress}
//               comments={this.state.comments}
//             />
//             <HouseReviewList houseReviews={this.state.reviews} />
//           </section>
//           <HouseReviewForm
//             houseAddress={this.state.slug.split("-").join(" ")}
//           />
//         </>
//       ) : null}
//     </div>
//   );
// }
export default SingleHouse;

const SingleHouseEdit = ({ house }) => {
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

  async function onUpdate() {}

  return (
    <form onSubmit={onUpdate}>
      <div className="single-room-info">
        <article className="desc">
          <h3>Full Address</h3>
          <p>
            Street Address:
            <input
              type="text"
              value={houseAddress}
              onChange={event => setHouseAddress(event.target.value)}
            />
          </p>
          <p>
            City:
            <input
              type="text"
              value={city}
              onChange={event => setCity(event.target.value)}
            />
          </p>
          <p>
            State:
            <input
              type="text"
              value={stateName}
              onChange={event => setStateName(event.target.value)}
            />
          </p>
          <p>
            Zip:
            <input
              type="text"
              value={zip}
              onChange={event => setZip(event.target.value)}
            />
          </p>
          <h3>Contact Info</h3>
          <p>
            Landlord Email:
            <input
              type="text"
              value={landlordEmail}
              onChange={event => setLandlordEmail(event.target.value)}
            />
          </p>
          <p> Residents Emails: {house.currresidentsemail} </p>
        </article>
        <article className="info">
          <h3>info</h3>
          <h6>
            Rent:
            <input
              type="text"
              value={rent}
              onChange={event => setRent(event.target.value)}
            />
          </h6>
          <h6>
            Bedrooms:
            <input
              type="text"
              value={bedrooms}
              onChange={event => setBedrooms(event.target.value)}
            />
          </h6>
          <h6>
            Bathrooms:
            <input
              type="text"
              value={bathrooms}
              onChange={event => setBathrooms(event.target.value)}
            />
          </h6>
          <h6>
            Basement:
            <input
              type="checkbox"
              onChange={event => setBasement(event.target.value)}
            />{" "}
            {basement ? "    Yes basement" : "    No basement"}
          </h6>
          <h6>
            Laundry:
            <input
              type="checkbox"
              onChange={event => setLaundry(event.target.value)}
            />{" "}
            {laundry ? "Yes laundry" : "No laundry"}
          </h6>{" "}
          <h6>
            Parking:
            <input
              type="checkbox"
              onChange={event => setParking(event.target.value)}
            />{" "}
            {parking ? "Yes parking" : "No parking"}
          </h6>
          <h6>
            Porch:
            <input
              type="checkbox"
              onChange={event => setPorch(event.target.value)}
            />{" "}
            {porch ? "    Yes porch" : "    No porch"}
          </h6>
          <h6>
            Yard:
            <input
              type="checkbox"
              onChange={event => setYard(event.target.value)}
            />{" "}
            {yard ? "    Yes yard" : "    No yard"}
          </h6>
          <h6>Floor: {house.unit}</h6>
          <button block bsSize="large" type="submit">
            Update House Info
          </button>{" "}
        </article>
      </div>
    </form>
  );
};
