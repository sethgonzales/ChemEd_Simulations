import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';

const Header = ({ userAuth }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleAccountClick = () => {
    navigate('/account');
  };

  const handleSimulationClick = (event) => {
    navigate('/simulations');
  };


  return (
    <header className="header">
      <div className="left">
        <Link to="/" className="header-link">
          <h1>ChemEd Simulations</h1>
        </Link>
      </div>
      <div className="right">
      <button className="user-btn" onClick={handleSimulationClick}>Simulations</button>
        {!userAuth ? (
          <button className="user-btn" onClick={handleLoginClick}>Log In</button>
        ) : (
          <button className="user-btn" onClick={handleAccountClick}>Account</button>
        )}
      </div>

    </header>
  );
};

export default Header;

