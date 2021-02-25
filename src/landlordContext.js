import React, { Component } from "react";

const LandlordContext = React.createContext();

class LandlordProvider extends Component {
  state = {
    landlords: [],
    sortedLandlords: [],
    loadingLandlords: false,
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

  // setSubletters = subletters => {
  //   console.log(subletters);
  //   this.setState({
  //     subletters: subletters,
  //     sortedSubletters: subletters,
  //     featuresSubletters: subletters,
  //     minRent: Math.min(...subletters.map(item => item.rent)),
  //     maxRent: Math.max(...subletters.map(item => item.rent)),
  //     minSize: Math.min(...subletters.map(item => item.bedrooms)),
  //     maxSize: Math.max(...subletters.map(item => item.bedrooms)),
  //     rent: Math.max(...subletters.map(item => item.rent)),
  //     loadingSubletters: false
  //   });
  // };

  // setSortedSubletters = sortedSubletters => {
  //   this.setState({
  //     sortedSubletters: sortedSubletters
  //   });
  // };

  // getSubletter = slug => {
  //   console.log(this.state.subletters);
  //   let tempSubletters = [...this.state.subletters];
  //   const subletter = tempSubletters.find(subletter => subletter.slug === slug);
  //   return subletter;
  // };

  handleSearchInput = value => {
    // let tempSubletters = [...this.state.subletters];
    // tempSubletters = tempSubletters.filter(subletter =>
    //   subletter.houseaddress.includes(value)
    // );
    // this.setState({
    //   sortedSubletters: tempSubletters
    // });
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
          // getSubletter: this.getSubletter,
          // setSubletters: this.setSubletters,
          // handleChange: this.handleChange,
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
