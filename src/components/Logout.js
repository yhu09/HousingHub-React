import React, { Component } from "react";
import { useAuth } from "../utility/auth";
import { Button } from "react-bootstrap";

const LogoutFunctional = () => {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens(null);
  }
  return (
    <div>
      <form onSubmit={logOut}>
        <Button block bsSize="large" type="submit">
          Log Out
        </Button>
      </form>
    </div>
  );
};

export default class Logout extends Component {
  render() {
    return <LogoutFunctional />;
  }
}
