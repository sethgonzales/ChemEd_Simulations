import React, { useRef } from 'react';
import './StatesOfMatter.css';
import SolidParticles from './SolidParticles';

const StatesOfMatter = () => {
  const canvasRef = useRef(null);

  return (
    <div className='simulation'>
      <h1>States of Matter</h1>
      <div id="SOM-container" className='SOM-container'>
        <SolidParticles />
      </div>
    </div>
  );
};

export default StatesOfMatter;
