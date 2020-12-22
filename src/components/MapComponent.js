import React, { useContext } from "react";
import Hero from "../components/commonHeaders/Hero";
import Banner from "../components/commonHeaders/Banner";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { HouseContext } from "../context";
require("dotenv").config();

const containerStyle = {
  width: "500px",
  height: "300px"
};

const center = {
  lat: 42.4085,
  lng: -71.1183
};

const Map = () => {
  const [map, setMap] = React.useState(null);
  const context = useContext(HouseContext);

  const onLoad = React.useCallback(async function callback(map) {
    setMap(map);

    // await fetch(
    //   "https://maps.googleapis.com/maps/api/geocode/json?address=355+Boston+Ave,+Medford,+MA&key=" +
    //     GoogleAPIKey
    // )
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //   });
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyBhzhYkTYAkiLPPcxRUxswZa7olOZYkz0c">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
