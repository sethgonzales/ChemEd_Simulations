import React, { useEffect, useState, useRef } from 'react';
import './StatesOfMatter.css';
import SolidParticles from './SolidParticles';

const StatesOfMatter = () => {
 
  return (
    <div className='simulation'>
      <h1>States of Matter</h1>
      <div id="SOM-container" className='SOM-container'>
        <canvas ref={canvasRef} width="400" height="400"></canvas>
      </div>
      <div>
      </div>
    </div>
  );
};

export default StatesOfMatter;
