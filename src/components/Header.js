import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';


const Header = ({ userAuth }) => {
  const chemElements = [
    {
      massNumber: '6',
      symbol: 'C',
      elementName: 'Carbon',
      aveMass: '12.01',
    },
    {
      massNumber: '2',
      symbol: 'He',
      elementName: 'Helium',
      aveMass: '4.02',
    },
    {
      massNumber: '25',
      symbol: 'Mn',
      elementName: 'Manganese',
      aveMass: '54.84',
    },
    {
      massNumber: '63',
      symbol: 'Eu',
      elementName: 'Europium',
      aveMass: '151.96',
    },
    {
      massNumber: '105',
      symbol: 'Db',
      elementName: 'Dubnium',
      aveMass: '[268]',
    }
  ];

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

  const colors = ['#36b6c2', '#ff4733', '#efb814', '#70b858', '#1aabb9'];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const [hoveredColors, setHoveredColors] = useState(new Array(chemElements.length).fill(''));

  const handleHover = (index) => {
    const newHoveredColors = [...hoveredColors];
    newHoveredColors[index] = getRandomColor();
    setHoveredColors(newHoveredColors);
  };

  const handleHoverOut = (index) => {
    const newHoveredColors = [...hoveredColors];
    newHoveredColors[index] = '';
    setHoveredColors(newHoveredColors);
  };


  return (
    <header className="header">
      <div className="left">
      <Link to="/" className="header-link">
          {chemElements.map((element, index) => (
            <div
              key={index}
              className={`element-card ${element.symbol}`}
              style={{ backgroundColor: hoveredColors[index] || getRandomColor() }}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHoverOut(index)}
            >
              <h5>{element.massNumber}</h5>
              <h1>
                {/* Wrap the letters in <span> elements to adjust their opacity */}
                {element.symbol === 'Mn' ? (
                  <>
                    <span style={{ opacity: 1 }}>{element.symbol[0]}</span>
                    <span style={{ opacity: 0.3 }}>{element.symbol[1]}</span>
                  </>
                ) : element.symbol === 'Eu' ? (
                  <>
                    <span style={{ opacity: 1 }}>{element.symbol[0]}</span>
                    <span style={{ opacity: 0.3 }}>{element.symbol[1]}</span>
                  </>
                ) : element.symbol === 'Db' ? (
                  <>
                    <span style={{ opacity: 1 }}>{element.symbol[0]}</span>
                    <span style={{ opacity: 0.3 }}>{element.symbol[1]}</span>
                  </>
                ) : (
                  element.symbol
                )}
              </h1>
              <h5>{element.elementName}</h5>
              <h5>{element.aveMass}</h5>
            </div>
          ))}
        </Link>
      </div>
      <div className="right">
        <button className="user-btn btn-1" onClick={handleSimulationClick}>Simulations</button>
        {!userAuth ? (
          <button className="user-btn btn-1" onClick={handleLoginClick}>Log In</button>
        ) : (
          <button className="user-btn btn-1" onClick={handleAccountClick}>Account</button>
        )}
      </div>

    </header>
  );
};

export default Header;

