import React, { useState, useContext } from "react";
import "./App.css";
import "./pages/Home";
import { Home } from "./pages/Home";
import { Houses } from "./pages/Houses";
import { Error } from "./pages/Error";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/commonHeaders/Navbar";
import { Subletter } from "./pages/Subletter";
import { Landlords } from "./pages/Landlords";
import { SubletForm } from "./pages/subletForm/SubletForm";
import { HouseForm } from "./pages/houseForm/HouseForm";
import { LandlordForm } from "./pages/landlordForm/LandlordForm";
import SingleHouse from "./pages/SingleHouse";
import SingleSubletter from "./pages/SingleSubletter";
import SingleLandlord from "./pages/SingleLandlord";
import "semantic-ui-css/semantic.min.css";
import VerifyEmail from "./pages/VerifyEmail";

require("dotenv").config();

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/houseform/" component={HouseForm} />
          <Route exact path="/subletform/" component={SubletForm} />
          <Route exact path="/landlordform/" component={LandlordForm} />
          <Route exact path="/houses/" component={Houses} />
          <Route exact path="/houses/:slug" component={SingleHouse} />
          <Route exact path="/sublet" component={Subletter} />
          <Route exact path="/sublet/:slug/:user" component={SingleSubletter} />
          <Route exact path="/verification" component={VerifyEmail} />
          <Route exact path="/landlords/" component={Landlords} />
          <Route exact path="/landlords/:slug" component={SingleLandlord} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
