import React, { Component } from "react";
import defaultBcg from "../images/house-8.jpeg";
import Hero from "../components/commonHeaders/Hero";
import Banner from "../components/commonHeaders/Banner";
import { Link } from "react-router-dom";
import { HouseContext } from "../context";
import StyledHero from "../components/commonHeaders/StyledHero";
import HouseReviewForm from "../components/house/houseReview/HouseReviewForm";
import HouseReviewList from "../components/house/houseReview/HouseReviewList";

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
    let address = this.state.slug;
    console.log(address);
    await fetch(
      "http://localhost:3002/houseReview/houseAddress/?houseAddress=" + address
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
        <HouseReviewList houseReviews={this.state.reviews} />
        <HouseReviewForm houseAddress={this.state.slug} />
      </>
    );
  }
}
