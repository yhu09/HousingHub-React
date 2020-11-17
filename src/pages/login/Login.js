import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useAuth } from "../../utility/auth";
import "./Login.css";
import cookie from "react-cookies";

var CryptoJS = require("crypto-js");

export const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [logInResult, setLogInResult] = useState(false);
  const { setAuthTokens } = useAuth();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function DisplayLogInResult() {
    if (logInResult) {
      if (loggedIn) {
        return <div>Log in Successful</div>;
      } else {
        return <div>Credentials incorrect. Log in failed.</div>;
      }
    } else {
      return <div></div>;
    }
  }

  function handleSubmit(event) {
    console.log("on submit");
    var encryptEmail = CryptoJS.AES.encrypt(
      JSON.stringify(email),
      "example-key"
    ).toString();

    var encryptPass = CryptoJS.AES.encrypt(
      JSON.stringify(password),
      "example-key"
    ).toString();

    console.log("email: " + email);
    console.log("encrypted email: " + encryptEmail);
    console.log("password: " + password);
    console.log("encrypted password; " + encryptPass);

    fetch(
      "http://localhost:3002/users/login?email=" +
        email +
        "&password=" +
        password
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.length !== 0) {
          setAuthTokens(data);
          setLoggedIn(true);
          cookie.save("email", email, { path: "/" });
        } else {
          setAuthTokens(null);
          setLoggedIn(false);
        }
        setLogInResult(true);
      });

    event.preventDefault();
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
      <DisplayLogInResult />
    </div>
  );
};
