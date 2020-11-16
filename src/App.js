import React, { useState } from "react";
import "./App.css";
import "./pages/Home";
import { Home } from "./pages/Home";
import { Houses } from "./pages/Houses";
import { Error } from "./pages/Error";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/commonHeaders/Navbar";
import { Subletter } from "./pages/Subletter";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/login/Signup";
import { HouseForm } from "./pages/houseForm/HouseForm";
import { AuthContext } from "./utility/auth";
import PrivateRoute from "./PrivateRoute";
import SingleHouse from "./pages/SingleHouse";

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = data => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <>
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login/" component={Login} />
            <Route exact path="/signup/" component={Signup} />
            <Route exact path="/houseform/" component={HouseForm} />
            <PrivateRoute exact path="/houses/" component={Houses} />
            <PrivateRoute exact path="/houses/:slug" component={SingleHouse} />
            <PrivateRoute exact path="/sublet" component={Subletter} />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
