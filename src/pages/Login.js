import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";

var CryptoJS = require("crypto-js");

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
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

    fetch("http://localhost:3002/users/login?email=" + email)
      .then(response => response.json())
      .then(data => console.log(data));
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
    </div>
  );
};
