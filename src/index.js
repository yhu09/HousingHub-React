import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { HouseProvider } from "./context";
import { Auth0Provider } from "@auth0/auth0-react";
require("dotenv").config();

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AuthDomain}
    clientId={process.env.REACT_APP_AuthClientId}
    redirectUri={window.location.origin}
    audience={process.env.REACT_APP_AuthAudience}
    scope={process.env.REACT_APP_Scope}
  >
    <HouseProvider>
      <Router>
        <App />
      </Router>
    </HouseProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
