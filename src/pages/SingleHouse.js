import React, { Component } from "react";
import defaultBcg from "../images/house-8.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { HouseContext } from "../context";
import StyledHero from "../components/StyledHero";
import HouseReviewForm from "../components/HouseReview/HouseReviewForm";

export default class SingleHouse extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    };
  }

  static contextType = HouseContext;
  render() {
    const { getHouse } = this.context;
    const house = getHouse(this.state.slug);
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
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images
    } = house;
    const [mainImg, ...defaultImg] = images;
    return (
      <>
        <StyledHero img={mainImg}>
          <Banner title={`${name}`}>
            <Link to="/houses" className="btn-primary">
              Back to Houses
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((item, index) => {
              return <img key={index} src={item} alt={name} />;
            })}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p> {description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price: ${price}</h6>
              <h6>size: {size} SQFT</h6>
              <h6>
                max capacity :{" "}
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>
              <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
              <h6>{breakfast && "freebreake included"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}>-{item}</li>;
            })}
          </ul>
        </section>
        <HouseReviewForm />
      </>
    );
  }
}
