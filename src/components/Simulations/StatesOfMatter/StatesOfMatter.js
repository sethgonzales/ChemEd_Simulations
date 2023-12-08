import React, { useState, useRef } from 'react';
import './StatesOfMatter.css';
import Solid from './Solid';
import Liquid from './Liquid';
import Gas from './Gas';

const StatesOfMatter = () => {
  const [currentState, setCurrentState] = useState('solid');
  const [temperature, setTemperature] = useState(25);
  const canvasRef = useRef(null);
  const moleculesRef = useRef([]);

  // ... (your existing useEffect code)

  const handleStateChange = newState => {
    setCurrentState(newState);
  };

  return (
    <div className='simulation'>
      <h1>States of Matter</h1>
      {currentState === 'solid' && <Solid molecules={moleculesRef.current} />}
      {currentState === 'liquid' && <Liquid molecules={moleculesRef.current} />}
      {currentState === 'gas' && <Gas molecules={moleculesRef.current} />}

      <div id="SOM-container" className='SOM-container'>
        <canvas ref={canvasRef} id="canvas" width="400" height="400"></canvas>
      </div>

      {/* Buttons to switch between states */}
      <button onClick={() => handleStateChange('solid')} className="btn">
        Solid
      </button>
      <button onClick={() => handleStateChange('liquid')} className="btn">
        Liquid
      </button>
      <button onClick={() => handleStateChange('gas')} className="btn">
        Gas
      </button>

      {/* Your temperature slider and other controls */}
      <label htmlFor="temperature-slider">Temperature:</label>
      {/* <input
        type="range"
        id="temperature-slider"
        min="-20"
        max="120"
        step="1"
        value={temperature}
        onChange={handleTempChange}
      /> */}
      <span>{temperature}</span>
      <button id="start-btn" className="btn">
        Start
      </button>
    </div>
  );
};

export default StatesOfMatter;
