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
import Sublet from "./subletter/Sublet";

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

const Map = ({ houses, subletters }) => {
  const [map, setMap] = React.useState(null);
  const [openInfoWindowMarkerId, setOpenInfoWindowMarkerId] = React.useState(
    ""
  );

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
          {houses === null || houses === undefined ? null : (
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
                    <InfoWindow
                      onCloseClick={() => handleToggleClose()}
                      options={{ maxWidth: 350 }}
                    >
                      <House house={houses[index]} />
                    </InfoWindow>
                  )}
                </Marker>
              ))}
            </>
          )}

          {subletters === null || subletters === undefined ? null : (
            <>
              {subletters.map((subletter, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: parseFloat(subletter.latitude),
                    lng: parseFloat(subletter.longitude)
                  }}
                  onClick={() => handleToggleOpen(index)} // marker ID is the key here.
                >
                  {index === openInfoWindowMarkerId && (
                    <InfoWindow onCloseClick={() => handleToggleClose()}>
                      <Sublet sublet={subletters[index]} />
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
