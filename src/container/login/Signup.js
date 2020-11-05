import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  FormText,
  FormGroup,
  FormControl,
  FormLabel
} from "react-bootstrap";
import "./Signup.css";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      email.length > 0 && password.length > 0 && password === confirmPassword
    );
  }

  function validateConfirmationForm() {
    return confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // setIsLoading(true);

    // setNewUser("test");

    var genderBool;
    if ("male" === gender) {
      genderBool = true;
    } else {
      genderBool = false;
    }

    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        gradYear: gradYear,
        gender: genderBool,
        email: email,
        pswd: password
      })
    };
    await fetch("http://localhost:3002/users", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

    requestOptions = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: email,
        role: "student"
      })
    };
    await fetch("http://localhost:3002/user/addRole", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

    requestOptions = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: email,
        role: "student"
      })
    };
    await fetch("http://localhost:3002/user/addRight", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <FormLabel>Confirmation Code</FormLabel>
          <FormControl
            autoFocus
            type="tel"
            onChange={e => setConfirmationCode(e.target.value)}
            value={confirmationCode}
          />
          <FormText>Please check your email for the code.</FormText>
        </FormGroup>
        <Button
          block
          bsSize="large"
          disabled={!validateConfirmationForm()}
          type="submit"
        >
          Verify
        </Button>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="firstName" bsSize="large">
          <FormLabel>First Name</FormLabel>
          <FormControl
            autoFocus
            type="name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="lastName" bsSize="large">
          <FormLabel>Last Name</FormLabel>
          <FormControl
            autoFocus
            type="name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="gradYear" bsSize="large">
          <FormLabel>Graduation Year</FormLabel>
          <FormControl
            autoFocus
            type="year"
            value={gradYear}
            onChange={e => setGradYear(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="gender" bsSize="large">
          <FormLabel>Gender</FormLabel>
          <FormControl
            as="select"
            autoFocus
            type="year"
            value={gender}
            onChange={e => setGender(e.target.value)}
            custom
          >
            <option value="null">Choose...</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </FormControl>
        </FormGroup>
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
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Sign up
        </Button>
      </form>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
};
