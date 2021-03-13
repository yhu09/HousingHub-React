import React, { useState, useEffect, useContext, useCallback } from "react";
import { APIBASE } from "../../utility/api-base";
import { HouseContext } from "../../context";
import { useAuth0 } from "@auth0/auth0-react";
import Sublet from "../subletter/Sublet";
import LogoutButton from "../auth0/LogoutButton";
import axios from 'axios';

const Account = () => {
  const context = useContext(HouseContext);
  const { token, isTokenSet, setToken, getHouse } = context;
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [managementToken, setManagementToken] = useState();
  const [subletter, setSubletter] = useState();
  const [userMetadata, setUserMetadata] = useState();

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
    console.log(user);
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

  async function getManagementAccessToken() {

    var options = {
      method: 'POST',
      url: 'https://dev-3wyopwot.us.auth0.com/oauth/token',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        grant_type: 'client_credentials',
        client_id: '792aZp5QDorTh99dyz39xC3nwLjy1BJ1',
        client_secret: "sjx2KnpPeskCpbSyfGLKS-8kRDVKtXcp-E-f661oPMtArwR9_9ZPhqGwz4r_WRQr",
        audience: 'https://dev-3wyopwot.us.auth0.com/api/v2/'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  // async function getUserMetaDate() {
  //   var requestOptions = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`
  //     }
  //   };
  //   await fetch(
  //     "https://dev-3wyopwot.us.auth0.com/userinfo/", requestOptions
  //   )
  //     .then(response => response.json())
  //     .then(data => { console.log(data) });
  // }

  useEffect(() => {
    if (isAuthenticated) {
      // if (managementToken == null) {
      //   getManagementAccessToken();
      //   console.log("get management API");
      // }
      fetchToken();
      getSubletPosts();
      // getUserMetaDate();
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
            <p>Email: {user.email}</p>
            <p>Gender: {user.name}</p>
            <p>Year: {user.nickname}</p>
            <LogoutButton />
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
