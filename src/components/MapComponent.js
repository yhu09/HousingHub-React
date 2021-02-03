import React, { useContext } from "react";
import Hero from "../components/commonHeaders/Hero";
import Banner from "../components/commonHeaders/Banner";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import { HouseContext } from "../context";
import House from "./house/House";

require("dotenv").config();

const containerStyle = {
  width: "100%",
  height: "100vh"
};

const center = {
  lat: 42.4085,
  lng: -71.1183
};

const APIKey = process.env.REACT_APP_GoogleMapsAPIKey;

const Map = ({ houses }) => {
  const [map, setMap] = React.useState(null);
  const [openInfoWindowMarkerId, setOpenInfoWindowMarkerId] = React.useState(
    ""
  );

  const context = useContext(HouseContext);
  const { hoverThumbnail } = context;

  const onLoad = React.useCallback(async function callback(map) {
    console.log(houses);
    console.log(hoverThumbnail);
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

  function handleToggleOpen(index) {
    setOpenInfoWindowMarkerId(index);
  }

  function handleToggleClose() {
    setOpenInfoWindowMarkerId(null);
  }

  return (
    <div>
      <LoadScript googleMapsApiKey={APIKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {houses === null ? null : (
            <>
              {houses.map((house, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: parseFloat(house.latitude),
                    lng: parseFloat(house.longitude)
                  }}
                  onClick={() => handleToggleOpen(index)} // marker ID is the key here.
                >
                  {index === openInfoWindowMarkerId && (
                    <InfoWindow onCloseClick={() => handleToggleClose()}>
                      <House house={houses[index]} />
                    </InfoWindow>
                  )}
                </Marker>
              ))}
            </>
          )}

          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
