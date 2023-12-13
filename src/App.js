import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './components/Header';
import Home from './components/Home';
import LogIn from './components/Account/LogIn';
import Register from './components/Account/Register';
import AccountDetails from './components/Account/AccountDetails';
import Edit from './components/Account/Edit';
import StatesOfMatter from './components/Simulations/StatesOfMatter/StatesOfMatter';
import SimulationList from './components/Simulations/SimulationsList';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log('Is authenticated:', isAuthenticated);

  const handleAuthChange = (value) => {
    setIsAuthenticated(value);
  };


  return (
    <Router>
      <React.Fragment>
        <Header userAuth={isAuthenticated} />
        <div className="app-main">
          <Routes>

            <Route
              path='/'
              element={
                <TransitionGroup>
                  <CSSTransition
                    key='home'
                    timeout={500}
                    classNames='route'
                  >
                    <Home userAuth={isAuthenticated} />
                  </CSSTransition>
                </TransitionGroup>
              }
            />
            <Route
              path='/login'
              element={
                <TransitionGroup>
                  <CSSTransition
                    key='login'
                    timeout={500}
                    classNames='route'
                  >
                    <LogIn handleAuthChange={handleAuthChange} />
                  </CSSTransition>
                </TransitionGroup>
              }
            />
            <Route
              path='/register'
              element={
                <TransitionGroup>
                  <CSSTransition
                    key='register'
                    timeout={500}
                    classNames='route'
                  >
                    <Register />
                  </CSSTransition>
                </TransitionGroup>
              }
            />
            <Route
              path='/account'
              element={
                <TransitionGroup>
                  <CSSTransition
                    key='account'
                    timeout={500}
                    classNames='route'
                  >
                    <AccountDetails userAuth={isAuthenticated} handleAuthChange={handleAuthChange} />
                  </CSSTransition>
                </TransitionGroup>
              }
            />
            <Route
              path='/edit'
              element={
                <TransitionGroup>
                  <CSSTransition
                    key='edit'
                    timeout={500}
                    classNames='route'
                  >
                    <Edit userAuth={isAuthenticated} />
                  </CSSTransition>
                </TransitionGroup>
              }
            />
            <Route
              path='/simulations'
              element={
                <TransitionGroup>
                  <CSSTransition
                    key='simulations'
                    timeout={500}
                    classNames='route'
                  >
                    <SimulationList />
                  </CSSTransition>
                </TransitionGroup>
              }
            />
            <Route
              path='/states-of-matter'
              element={
                <TransitionGroup>
                  <CSSTransition
                    key='states-of-matter'
                    timeout={500}
                    classNames='route'
                  >
                    <StatesOfMatter />
                  </CSSTransition>
                </TransitionGroup>
              }
            />
          </Routes>
        </div>
        <Footer />
      </React.Fragment>
    </Router>
  );
};

export default App;
