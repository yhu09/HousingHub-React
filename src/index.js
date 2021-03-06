import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { HouseProvider } from "./context";
import { SubletProvider } from "./subletContext";
import { Auth0Provider } from "@auth0/auth0-react";
import { LandlordProvider } from "./landlordContext";
require("dotenv").config();

const audience =
  process.env.REACT_APP_STAGE === "production"
    ? process.env.REACT_APP_AuthAudienceProduction
    : process.env.REACT_APP_AuthAudienceLocal;

console.log(audience);

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AuthDomain}
    clientId={process.env.REACT_APP_AuthClientId}
    redirectUri={window.location.origin}
    audience={audience}
    scope={process.env.REACT_APP_Scope}
  >
    <LandlordProvider>
      <SubletProvider>
        <HouseProvider>
          <Router>
            <App />
          </Router>
        </HouseProvider>
      </SubletProvider>
    </LandlordProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
