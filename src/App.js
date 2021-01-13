import React, { useState, useContext } from "react";
import "./App.css";
import "./pages/Home";
import { Home } from "./pages/Home";
import { Houses } from "./pages/Houses";
import { Error } from "./pages/Error";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/commonHeaders/Navbar";
import { Subletter } from "./pages/Subletter"
import { HouseForm } from "./pages/houseForm/HouseForm";
import SingleHouse from "./pages/SingleHouse";
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
          <Route exact path="/houses/" component={Houses} />
          <Route exact path="/houses/:slug" component={SingleHouse} />
          <Route exact path="/sublet" component={Subletter} />
          <Route exact path="/verification" component={VerifyEmail} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
