import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <div className="app-main ">
          <Routes>
            <Route
              path="/"
              exact
              element={<Home userAuth={isAuthenticated} />}
            />
            <Route path="/login" element={<LogIn handleAuthChange={handleAuthChange} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/account"
              exact
              element={<AccountDetails userAuth={isAuthenticated} handleAuthChange={handleAuthChange} />}
            />
            <Route
              path="/edit"
              element={<Edit userAuth={isAuthenticated} />}
            />
            <Route
              path="/simulations"
              element={<SimulationList userAuth={isAuthenticated} />} />
            <Route
              path="/states-of-matter"
              element={<StatesOfMatter />} />
          </Routes>
        </div>
        <Footer />
      </React.Fragment>
    </Router >
  );
};

export default App;
