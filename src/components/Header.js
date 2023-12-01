import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="left">
        <h1>ChemEd Simulations</h1>
      </div>
      <div className="right">
        <button className="login-btn">Log In</button>
        <select className="simulations-dropdown">
          <option value="StatesOfMatter">States of Matter</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </header>
  );
};

export default Header;

