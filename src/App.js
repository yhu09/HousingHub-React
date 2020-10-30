import React from "react";
import "./App.css";
import "./pages/Home";
import { Home } from "./pages/Home";
import { Houses } from "./pages/Houses";
import Unit from "./pages/Unit";
import { Error } from "./pages/Error";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Subletter } from "./pages/Subletter";
import { Login } from "./pages/Login";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/houses/" component={Houses} />
        <Route exact path="/houses/:slug" component={Unit} />
        <Route exact path="/sublet" component={Subletter} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
