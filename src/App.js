import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import LogIn from './components/Account/LogIn';
import Register from './components/Account/Register';
import AccountDetails from './components/Account/AccountDetails';
import Edit from './components/Account/Edit';
import SimulationList from './components/Simulations/SimulationsList';
import StatesOfMatter from './components/Simulations/StatesOfMatter/StatesOfMatter';
import LewisStructure from './components/Simulations/LewisStructure/LewisStructure';
import Footer from './components/Footer';
import withAuthorization from './components/Account/withAuthorization'; // Import the withAuthorization HOC
import './App.css';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log('Is authenticated:', isAuthenticated);

  const handleAuthChange = (value) => {
    setIsAuthenticated(value);
  };

  const ProtectedAccountDetails = withAuthorization(AccountDetails);
  const ProtectedSimulationList = withAuthorization(SimulationList);
  const ProtectedStatesOfMatter = withAuthorization(StatesOfMatter);
  const ProtectedLewisStructure = withAuthorization(LewisStructure);

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
            <Route path="/account" exact element={<ProtectedAccountDetails handleAuthChange={handleAuthChange} />} />

            <Route
              path="/edit"
              element={<Edit userAuth={isAuthenticated} />}
            />
            <Route path="/simulations" element={<ProtectedSimulationList />} />
            <Route path="/states-of-matter" element={<ProtectedStatesOfMatter />} />
            <Route path="/lewis-structures" element={<ProtectedLewisStructure />} />
          </Routes>
        </div>
        <Footer />
      </React.Fragment>
    </Router >
  );
};

export default App;
