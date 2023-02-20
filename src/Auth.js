import React from "react";
import { useState, useEffect } from "react";
import "./Auth.css";
import jwt_decode from "jwt-decode";
import HomePage from "./HomePage";

const Auth = (props) => {
  // const [user, setUser] = useState({});
  const [IsSignedIn, setIsSignedIn] = useState(false);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    // setUser(userObject);
    setIsSignedIn(true);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    // setUser({});
    setIsSignedIn(false);
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "1024960509808-6rqdknpet2odqdf16mu86tvh6folv7d4.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    // google.accounts.id.prompt();
  }, []);

  const [inputValue, setInputValue] = useState("");

  return (
    <div className="App">
      {!IsSignedIn && (
        <div
          className="SignIn">
          <h1>Sign In</h1>
          <div id="signInDiv"></div>
        </div>
      )}
      {IsSignedIn && (
        <div
          className="SignOut">
          <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
        </div>
      )}
      {IsSignedIn && <HomePage />}
    </div>
  );
};

export default Auth;
