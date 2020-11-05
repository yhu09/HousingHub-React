import React, { useState } from "react";
import "./App.css";
import "./pages/Home";
import { Home } from "./pages/Home";
import { Houses } from "./pages/Houses";
import Unit from "./pages/Unit";
import { Error } from "./pages/Error";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Subletter } from "./pages/Subletter";
import { Login } from "./container/login/Login";
import { Signup } from "./container/login/Signup";
import { AuthContext } from "./utility/auth";
import PrivateRoute from "./PrivateRoute";

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
            <PrivateRoute exact path="/houses/" component={Houses} />
            <PrivateRoute exact path="/houses/:slug" component={Unit} />
            <PrivateRoute path="/sublet" component={Subletter} />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
