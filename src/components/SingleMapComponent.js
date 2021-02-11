import React, { useContext } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { HouseContext } from "../context";
require("dotenv").config();

const containerStyle = {
  width: "100%",
  height: "50vh"
};

const APIKey = process.env.REACT_APP_GoogleMapsAPIKey;

const SingleMap = ({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
  edit
}) => {
  const [map, setMap] = React.useState(null);
  const [latitudeEdit, setLatitudeEdit] = React.useState(latitude);
  const [longitudeEdit, setLongitudeEdit] = React.useState(longitude);

  const context = useContext(HouseContext);

  const onLoad = React.useCallback(async function callback(map) {
    console.log(latitude);
    console.log(longitude);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  function placeMarker(e) {
    setLatitudeEdit(e.latLng.lat());
    setLongitudeEdit(e.latLng.lng());
    setLatitude(e.latLng.lat());
    setLongitude(e.latLng.lng());
  }

  return (
    <div>
      {edit ? (
        <LoadScript googleMapsApiKey={APIKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: latitude, lng: longitude }}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={placeMarker}
          >
            <Marker position={{ lat: latitudeEdit, lng: longitudeEdit }} />
            {/* Child components, such as markers, info windows, etc. */}
          </GoogleMap>
        </LoadScript>
      ) : (
        <LoadScript googleMapsApiKey={APIKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: latitude, lng: longitude }}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker position={{ lat: latitude, lng: longitude }} />
            {/* Child components, such as markers, info windows, etc. */}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default SingleMap;
