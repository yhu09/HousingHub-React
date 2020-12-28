import React, { Component } from "react";

const HouseContext = React.createContext();

class HouseProvider extends Component {
  state = {
    houses: [],
    sortedHouses: [],
    featuredHouses: [],
    loading: true,
    bedrooms: 1,
    rent: 0,
    token: "",
    // type: "all",
    // capacity: 1,
    // price: 0,
    minRent: 0,
    maxRent: 0,
    minSize: 0,
    maxSize: 0,
    laundry: false,
    porch: false
    // breakfast: false,
    // pets: false
  };

  async componentDidMount() {
    // await fetch("http://localhost:3002/houses", {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     this.setState({
    //       houses: data,
    //       sortedHouses: data,
    //       featuredHouses: data,
    //       loading: false
    //     });
    //   });
    // let houses = this.formatData(items);
    // let featuredHouses = houses.filter(house => house.featured === true);
    // let maxPrice = Math.max(...houses.map(item => item.price));
    // let maxSize = Math.max(...houses.map(item => item.price));
    // this.setState({
    //   houses,
    //   featuredHouses,
    //   sortedHouses: houses,
    //   loading: false,
    //   price: maxPrice,
    //   maxPrice,
    //   maxSize
    // });
    // console.log(houses);
    // console.log(this.state.housesTest);
    // let featuredHouses =
  }

  // formatData(array) {
  //   let tempItems = array.map(item => {
  //     let id = item.sys.id;
  //     let images = item.fields.images.map(image => image.fields.file.url);

  //     let house = { ...item.fields, images, id };
  //     return house;
  //   });
  //   return tempItems;
  // }

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

  setHouses = houses => {
    console.log(houses);
    this.setState({
      houses: houses,
      sortedHouses: houses,
      featuredHouses: houses,
      minRent: Math.min(...houses.map(item => item.rent)),
      maxRent: Math.max(...houses.map(item => item.rent)),
      minSize: Math.min(...houses.map(item => item.bedrooms)),
      maxSize: Math.max(...houses.map(item => item.bedrooms)),
      rent: Math.max(...houses.map(item => item.rent)),
      laundry: false,
      loading: false
    });
  };

  setSortedHouses = sortedHouses => {
    this.setState({
      sortedHouses: sortedHouses
    });
  };

  getHouse = slug => {
    console.log(this.state.houses);
    let tempHouses = [...this.state.houses];
    const house = tempHouses.find(house => house.slug === slug);
    return house;
  };

  handleSearchInput = value => {
    let tempHouses = [...this.state.houses];
    console.log(tempHouses);
    console.log(value);
    tempHouses = tempHouses.filter(house => house.houseaddress.includes(value));
    this.setState({
      sortedHouses: tempHouses
    });

  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      houses,
      bedrooms,
      rent,
      minRent,
      maxRent,
      // houses,
      // type,
      // capacity,
      // price,
      minSize,
      maxSize,
      laundry,
      porch
    } = this.state;

    let temphouses = [...houses];
    bedrooms = parseInt(bedrooms);
    rent = parseInt(rent);
    minSize = parseInt(minSize);
    maxSize = parseInt(maxSize);

    temphouses = temphouses.filter(house => house.rent <= rent);
    //filter by cap
    if (bedrooms !== 1) {
      temphouses = temphouses.filter(house => house.bedrooms >= bedrooms);
    }

    temphouses = temphouses.filter(house => house.bedrooms >= minSize && house.bedrooms <= maxSize)

    if (laundry) {
      temphouses = temphouses.filter(house => house.laundry === true)
    }

    if (porch) {
      temphouses = temphouses.filter(house => house.porch === true)
    }

    this.setState({
      sortedHouses: temphouses
    });
  };

  render() {
    return (
      <HouseContext.Provider
        value={{
          ...this.state,
          getHouse: this.getHouse,
          handleChange: this.handleChange,
          handleSearchInput: this.handleSearchInput,
          setHouses: this.setHouses,
          isTokenSet: this.isTokenSet,
          setToken: this.setToken
        }}
      >
        {this.props.children}
      </HouseContext.Provider>
    );
  }
}

const HouseConsumer = HouseContext.Consumer;

export function withHouseConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <HouseConsumer>
        {value => <Component {...props} context={value} />}
      </HouseConsumer>
    );
  };
}

export { HouseProvider, HouseConsumer, HouseContext };
