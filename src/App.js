import React from 'react';
import Header from './components/Header';
import SignIn from './components/Auth/SignIn';
import Home from './components/Home';
import StatesOfMatter from './components/Simulations/StatesOfMatter/StatesOfMatter';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Home />
      <SignIn />
      <StatesOfMatter />
      <Footer />
    </div>
  );
};

export default App;
