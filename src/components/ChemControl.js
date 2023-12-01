import React, { useState } from "react";
import { auth } from './../firebase.js';
import Home from './Home';
import SignIn from './Account/SignIn.js';


class ChemControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAuth: false,
      currentUser: null,
      simulationList: [],
      selectedSimulation: null,
    };
  }

  toggleSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  if (auth.currentUser == null) {
    return (
      <div>
        {showSignIn ? (
          <SignIn />
        ) : (
          <div>
            <h1>You must be signed in to access the simulations.</h1>
            <button onClick={toggleSignIn}>Sign In</button>
          </div>
        )}
      </div>
    );
  } else if (auth.currentUser != null) {
    return (
      <div>
        <Home />
      </div>
    );
  }
};

export default ChemControl;
