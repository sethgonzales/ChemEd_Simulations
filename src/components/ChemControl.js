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
    }

    return (
      <React.Fragment>
        {currentVisibleState}
        {this.state.userAuth && (
          <div>
            <button onClick={this.handleShowAccountDetails}>View Account</button>
            <button onClick={this.handleReturnHome}>Return Home</button>
          </div>
        )}
        {this.state.userAuth ? (
          <div>
            {/* Button or link to log out */}
            <button onClick={this.handleLogOut}>Sign out</button>
          </div>
        ) : (
          {
            currentVisibleState.type === Home && !this.state.userAuth && (

              <div>
                <button onClick={this.handleLogIn}>Sign in</button>
                <button onClick={this.handleRegister}>Register</button>
                <button onClick={this.handleReturnHome}>Return Home</button>

              </div>
            )
          }
      </React.Fragment>
    );
  }
}

export default ChemControl;
