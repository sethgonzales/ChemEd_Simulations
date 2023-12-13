import React, { useRef, useState } from 'react';
import './StatesOfMatter.css';
import SolidParticles from './SolidParticles';
import LiquidParticles from './LiquidParticles';
import GasParticles from './GasParticles';

const StatesOfMatter = () => {
  const canvasRef = useRef(null);
  const [currentState, setCurrentState] = useState('Solid'); // Initial state is 'solid'

  const toggleState = () => {
    // Function to toggle between states
    if (currentState === 'Solid') {
      setCurrentState('Liquid');
    } else if (currentState === 'Liquid') {
      setCurrentState('Gas');
    } else {
      setCurrentState('Solid');
    }
  };

  return (
    <div className='simulation-page'>
      <h1>States of Matter</h1>
      <div className='simulation-container'>
        <div id="SOM-container" className='SOM-container'>
          {currentState === 'Solid' && <SolidParticles />}
          {currentState === 'Liquid' && <LiquidParticles />}
          {currentState === 'Gas' && <GasParticles />}
        </div>
        <div className='SOM-control'>
          <h1>{currentState}</h1>
          <button onClick={toggleState}>Change State</button>
        </div>
      </div>
    </div>
  );
};

export default StatesOfMatter;
