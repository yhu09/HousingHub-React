import React, { Component } from "react";
import defaultBcg from "../images/house-8.jpeg";
import Hero from "../components/commonHeaders/Hero";
import Banner from "../components/commonHeaders/Banner";
import { Link } from "react-router-dom";
import { HouseContext } from "../context";
import StyledHero from "../components/commonHeaders/StyledHero";
import HouseReviewForm from "../components/house/houseReview/HouseReviewForm";
import HouseReviewList from "../components/house/houseReview/HouseReviewList";
import { uploadFile, getFile, imageLinkURL } from "../utility/s3-upload";

export default class SingleHouse extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      slug: this.props.match.params.slug,
      reviews: null,
      defaultBcg
    };
  }

  async componentDidMount() {
    await fetch(
      "http://localhost:3002/houseReview/houseAddress/?houseSlug=" +
        this.state.slug
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ reviews: data });
      });
  }

  static contextType = HouseContext;
  render() {
    const { getHouse } = this.context;
    console.log("here");
    console.log(this.state.slug);
    const house = getHouse(this.state.slug);
    console.log(house);

    if (!house) {
      return (
        <div className="error">
          {" "}
          <h3>House Not Found</h3>
          <Link to="/houses" className="btn-primary">
            {" "}
            back to rooms
          </Link>{" "}
        </div>
      );
    }

    const {
      averageElecBill,
      averageGasBill,
      averageWaterBill,
      basement,
      bathrooms,
      bedrooms,
      city,
      currresidentsemail,
      houseaddress,
      houseid,
      landlordemail,
      laundry,
      leaseend,
      leasestart,
      parking,
      porch,
      rent,
      statename,
      unit,
      yard,
      slug,
      zip,
      photokeys
    } = house;

    // const [mainImg, ...defaultImg] = images;
    console.log(photokeys);
    let imageLinks = [];
    for (let key of photokeys) {
      console.log(key);
      imageLinks.push(imageLinkURL(key));
    }
    console.log(imageLinks);
    return (
      <>
        <StyledHero>
          <Banner title={`${houseaddress}`}>
            <Link to="/houses" className="btn-primary">
              Back to Houses
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {imageLinks.map((item, index) => {
              return <img key={index} src={item} alt={houseaddress} />;
            })}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>Full Address</h3>
              <p>
                {" "}
                {houseaddress}, {city}, {statename} {zip}{" "}
              </p>
              <br></br>
              <h3>Contact Info</h3>
              <p> Landlord Email: {landlordemail} </p>
              <p> Residents Emails: {currresidentsemail} </p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>rent: ${rent}</h6>
              <h6>bedrooms: {bedrooms}</h6>
              <h6>bathrooms: {bathrooms}</h6>
              <h6>{basement ? "Basement" : "No basement"}</h6>
              <h6>{laundry ? "Laundry" : "No laundry"}</h6>
              <h6>{parking ? "Parking space" : "No parking space"}</h6>
              <h6>{porch ? "Porch" : "No porch"}</h6>
              <h6>{yard ? "Yard" : "No yard"}</h6>
              <h6>Floor: {unit}</h6>
            </article>
          </div>
        </section>
        {/* <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}>-{item}</li>;
            })}
          </ul>
        </section> */}
        <HouseReviewList houseReviews={this.state.reviews} />
        <HouseReviewForm houseAddress={this.state.slug.split("-").join(" ")} />
      </>
    );
  }
}
