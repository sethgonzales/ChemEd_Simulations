import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import LogIn from './components/Account/LogIn';
import Register from './components/Account/Register';
import AccountDetails from './components/Account/AccountDetails';
import StatesOfMatter from './components/Simulations/StatesOfMatter/StatesOfMatter';
import Footer from './components/Footer';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <React.Fragment>
      <Header />
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={<Home userAuth={isAuthenticated} />}
          />
          <Route path="/login" component={LogIn} />
          <Route path="/register" component={Register} />
          <Route path="/account" component={AccountDetails} />
          <Route path="/states-of-matter" component={StatesOfMatter} />
        </Routes>
      </Router>
      <Footer />
    </React.Fragment>
  );
};

export default App;
