import React, { useState } from "react";
import { auth } from './../firebase.js';
import Home from './Home';
import SignIn from './Account/SignIn';
import Register from './Account/Register';
import AccountDetails from './Account/AccountDetails';


class ChemControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAuth: false, //check user authorization
      simulationList: [], //hold an array of the simulations created
      selectedSimulation: null, //identify the simulation selected
    };
  }

  handleClick = () => {
    //when the homepage is active this button will exist for users to click to register an account. This will be at the bottom of the page
    //on viewing a simulation component this button will be at the bottom of the page for users to return home to
  }

  handleSignIn = () => {
    //handle showing the sign-in component
  };
 
  handleRegister = () => {
    //handle showing the register component
  };
 
  HandleSignOut = () => {
    //handle showing the sign-out component
  };


  return (
    <React.Fragment>
      {currentVisibleState}
      <div>
      <button onClick={this.handleClick}>{buttonText}</button>
      </div>
    </React.Fragment>
  )
}



export default ChemControl;
