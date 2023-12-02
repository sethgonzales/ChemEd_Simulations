import React, { useState } from "react";
import { auth } from "./../../firebase.js";
import { signOut } from "firebase/auth";

const AccountDetails = () => {
  const [signOutSuccess, setSignOutSuccess] = useState(null);

  const doSignOut = () => {
    signOut(auth)
      .then(() => {
        setSignOutSuccess("You have successfully signed out!");
      })
      .catch((error) => {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  };

  return (
    <React.Fragment>
      <h1>Account for User.Name</h1>
      <h1>Sign Out</h1>
      {signOutSuccess && <p>{signOutSuccess}</p>}
      <button onClick={doSignOut}>Sign out</button>
    </React.Fragment>
  );
};

export default AccountDetails;
