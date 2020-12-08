import React from "react";
import Hero from "../components/commonHeaders/Hero";
import Banner from "../components/commonHeaders/Banner";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '1000px',
  height: '300px'
};

const center = {
  lat: 42.4085,
  lng: -71.1183
};

export const Map = () => {
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
    <div>
      <Hero hero="mapsHero">
        <Banner
          title="Maps"
        ></Banner>
      </Hero>
      <LoadScript googleMapsApiKey="AIzaSyBhzhYkTYAkiLPPcxRUxswZa7olOZYkz0c">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
