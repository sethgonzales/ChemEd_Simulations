import React, { useState } from 'react';
import './StatesOfMatter.css';
import SolidParticles from './SolidParticles';
import LiquidParticles from './LiquidParticles';
import GasParticles from './GasParticles';
import AqueousParticles from './AqueousParticles'
import withAuthorization from './../../Account/withAuthorization';

const StatesOfMatter = () => {
  const [currentState, setCurrentState] = useState('Solid'); // Initial state is 'solid'

  const toggleState = () => {
    // Function to toggle between states
    if (currentState === 'Solid') {
      setCurrentState('Liquid');
    } else if (currentState === 'Liquid') {
      setCurrentState('Aqueous');
    } else if (currentState === 'Aqueous') {
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
          {currentState === 'Aqueous' && <AqueousParticles />}
          {currentState === 'Gas' && <GasParticles />}
        </div>
        <div className='SOM-control'>
          <h1>{currentState}</h1>
          <button onClick={toggleState} className='user-btn'>Change State</button>
        </div>
      </div>
    </div>
  );
};

export default withAuthorization(StatesOfMatter); 

