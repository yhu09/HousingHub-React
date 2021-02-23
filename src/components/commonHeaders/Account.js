import React, { useState, useEffect, useContext, useCallback } from "react";
import { APIBASE } from "../../utility/api-base";
import { HouseContext } from "../../context";
import { useAuth0 } from "@auth0/auth0-react";
import Sublet from "../subletter/Sublet";

const Account = () => {
  const context = useContext(HouseContext);
  const { token, isTokenSet, setToken, getHouse } = context;
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [subletter, setSubletter] = useState();
  const fetchToken = useCallback(async () => {
    if (!isTokenSet()) {
      try {
        if (isAuthenticated) {
          let tempToken = await getAccessTokenSilently({
            audience: APIBASE
          });
          setToken(tempToken);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isTokenSet, setToken, isAuthenticated, getAccessTokenSilently]);

  async function getSubletPosts() {
    console.log(user.email);
    var requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    await fetch(
      APIBASE + "subletters/email/?email=" + user.email,
      requestOptions
    )
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setSubletter(data[0]);
        } else {
          setSubletter(null);
        }
      });
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchToken();
      getSubletPosts();
    }
  }, [token, fetchToken]);

  return (
    <div>
      {isAuthenticated ? (
        <div className="account-box">
          <div className="account-info">
            <h6 style={{ fontSize: "16px" }}>Hello {user.given_name}!</h6>
            <p>
              Name: {user.given_name} {user.family_name}
            </p>
            <p>Email: {user.name}</p>
            <p>Gender: </p>
            <p>Year: </p>
          </div>
          <div className="account-subletter">
            <h6 style={{ textAlign: "center" }}>Active Subletter Post</h6>
            {subletter == null ? (
              <p style={{ textAlign: "center" }}> No posts </p>
            ) : (
              <Sublet sublet={subletter}></Sublet>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Account;
