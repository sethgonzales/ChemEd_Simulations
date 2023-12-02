import React, { useState } from "react";
import { auth } from './../firebase.js';
import Home from './Home';
import LogIn from './Account/LogIn';
import Register from './Account/Register';
import AccountDetails from './Account/AccountDetails';

class ChemControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAuth: false,
      selectedSimulation: null,
      logIn: false,
      registerAccount: false,
      accountDetails: false,
    };
  }

  handleLogIn = () => {
    this.setState({
      logIn: true,
      registerAccount: false,
      accountDetails: false,
    });
  };

  handleRegister = () => {
    this.setState({
      logIn: false,
      registerAccount: true,
      accountDetails: false,
    });
  };

  handleLogOut = () => {
    this.setState({
      userAuth: false,
      logIn: false,
      registerAccount: false,
      accountDetails: false,
    });
  };

  handleShowAccountDetails = () => {
    this.setState({
      logIn: false,
      registerAccount: false,
      accountDetails: true,
    });
  };

  handleReturnHome = () => {
    this.setState({
      userAuth: false,
      selectedSimulation: null,
      logIn: false,
      registerAccount: false,
      accountDetails: false,
    });
  };

  render() {
    let currentVisibleState = null;
    let homeButtons = null;

    if (this.state.selectedSimulation !== null) {
      // Logic to render selected simulation
    } else if (this.state.logIn) {
      currentVisibleState = <LogIn />;
    } else if (this.state.registerAccount) {
      currentVisibleState = <Register />;
    } else if (this.state.accountDetails) {
      currentVisibleState = <AccountDetails />;
    } else {
      currentVisibleState = <Home />;

      homeButtons = (
        <div>
          <button onClick={this.state.userAuth ? this.handleShowAccountDetails : this.handleRegister}>
            {this.state.userAuth ? "View Account" : "Register"}
          </button>
          <button onClick={this.handleReturnHome}>Return Home</button>
        </div>
      );
    }
    return (
      <React.Fragment>
        {currentVisibleState}
        {homeButtons}
        <div>
          {this.state.userAuth ? (
            // For authenticated users
            <React.Fragment>
              <button onClick={this.handleShowAccountDetails}>View Account</button>
              <button onClick={this.handleLogOut}>Sign Out</button>
            </React.Fragment>
          ) : (
            // For non-authenticated users
            <React.Fragment>
              {(this.state.logIn || this.state.registerAccount) && (
                <React.Fragment>
                  <button onClick={this.handleLogIn}> Sign In</button>
                  <button onClick={this.handleRegister}>Register</button>
                </React.Fragment>
              )}
              <button onClick={this.handleReturnHome}>Return Home </button>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ChemControl;