import React, { Component } from "react";

const LandlordContext = React.createContext();

class LandlordProvider extends Component {
  state = {
    landlords: [],
    sortedLandlords: [],
    loadingLandlords: true,
    token: ""
  };

  setToken = token => {
    this.setState({ token: token });
  };

  isTokenSet = () => {
    if (this.state.token === "") {
      return false;
    } else {
      return true;
    }
  };

  setLandlords = landlords => {
    console.log(landlords);
    this.setState({
      landlords: landlords,
      sortedLandlords: landlords,
      loadingLandlords: false
    });
  };

  setsortedLandlords = sortedLandlords => {
    this.setState({
      sortedLandlords: sortedLandlords
    });
  };

  getLandlord = landlordName => {
    console.log(this.state.landlords);
    let tempLandlords = [...this.state.landlords];
    const landlord = tempLandlords.find(
      landlord => landlord.landlordName === landlordName
    );
    return landlord;
  };

  handleSearchInput = value => {
    let tempLandlords = [...this.state.landlords];
    tempLandlords = tempLandlords.filter(landlord =>
      landlord.landlordname.includes(value)
    );
    this.setState({
      sortedLandlords: tempLandlords
    });
  };

  handleChange = event => {
    // const target = event.target;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    // const name = event.target.name;
    // this.setState(
    //   {
    //     [name]: value
    //   },
    //   this.filterRooms
    // );
    // console.log(event.target.value);
    // this.setState({ gender: event.target.value }, this.filterRooms);
  };

  // filterRooms = () => {
  //   let { subletters, rent, gender } = this.state;

  //   let tempSubletters = [...subletters];
  //   rent = parseInt(rent);

  //   tempSubletters = tempSubletters.filter(subletter => subletter.rent <= rent);
  //   console.log(gender);
  //   if (gender !== "") {
  //     tempSubletters = tempSubletters.filter(
  //       subletter => subletter.preferredgender === gender
  //     );
  //     this.setState({
  //       sortedSubletters: tempSubletters
  //     });
  //   }
  // };

  render() {
    return (
      <LandlordContext.Provider
        value={{
          ...this.state,
          getLandlord: this.getLandlord,
          setLandlords: this.setLandlords,
          handleChange: this.handleChange,
          handleSearchInput: this.handleSearchInput,
          isTokenSet: this.isTokenSet,
          setToken: this.setToken
        }}
      >
        {this.props.children}
      </LandlordContext.Provider>
    );
  }
}

const LandlordConsumer = LandlordContext.Consumer;

export function withLandlordConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <LandlordConsumer>
        {value => <Component {...props} context={value} />}
      </LandlordConsumer>
    );
  };
}

export { LandlordProvider, LandlordConsumer, LandlordContext };
