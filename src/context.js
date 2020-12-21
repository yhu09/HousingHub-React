import React, { Component } from "react";

const HouseContext = React.createContext();

class HouseProvider extends Component {
  state = {
    houses: [],
    sortedHouses: [],
    featuredHouses: [],
    loading: true,
    bedrooms: 1,
    rent: 0
    // type: "all",
    // capacity: 1,
    // price: 0,
    // minPrice: 0,
    // maxPrice: 0,
    // minSize: 0,
    // maxSize: 0,
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

  setHouses = houses => {
    console.log(houses);
    this.setState({
      houses: houses,
      sortedHouses: houses,
      featuredHouses: houses,
      loading: false
    });
  };

  setSortedHouses = sortedHouses => {
    this.setState({
      sortedHouses: sortedHouses
    });
  };

  getHouse = slug => {
    let tempHouses = [...this.state.houses];
    const house = tempHouses.find(house => house.slug === slug);
    return house;
  };

  handleChange = event => {
    const target = event.target;
    const value = event.type === "checkbox" ? target.checked : target.value;
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
      rent
      // houses,
      // type,
      // capacity,
      // price,
      // minSize,
      // maxSize,
      // breakfast,
      // pets
    } = this.state;

    let temphouses = [...houses];
    bedrooms = parseInt(bedrooms);

    // //filter by type
    // if (type !== "all") {
    //   temphouses = temphouses.filter(house => house.type === type);
    // }

    // //filter by cap
    // if (capacity !== 1) {
    //   temphouses = temphouses.filter(house => house.capacity >= capacity);
    // }

    //filter by cap
    if (bedrooms !== 1) {
      temphouses = temphouses.filter(house => house.bedrooms >= bedrooms);
    }
    this.setState({
      sortedHouses: temphouses
    });

    //filter by cap
    if (rent) {
      temphouses = temphouses.filter(house => house.bedrooms >= bedrooms);
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
          setHouses: this.setHouses
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
