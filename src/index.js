import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { HouseProvider } from "./context";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-3wyopwot.us.auth0.com"
    clientId="792aZp5QDorTh99dyz39xC3nwLjy1BJ1"
    redirectUri={window.location.origin}
    audience="http://localhost:3002/"
    scope="read:houses"
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
