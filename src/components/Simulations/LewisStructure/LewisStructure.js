import React, { useState } from 'react';
import './LewisStructure.css';
import withAuthorization from './../../Account/withAuthorization';

const LewisStructure = () => {
  const lewisElements = [
    {
      symbol: 'H',
      valenceElectrons: 1,
      octet: 2
    },
    {
      symbol: 'B',
      valenceElectrons: 3,
      octet: 8
    },
    {
      symbol: 'C',
      valenceElectrons: 4,
      octet: 8
    },
    {
      symbol: 'N',
      valenceElectrons: 5,
      octet: 8
    },
    {
      symbol: 'O',
      valenceElectrons: 6,
      octet: 8
    },
    {
      symbol: 'F',
      valenceElectrons: 7,
      octet: 8
    },
    {
      symbol: 'Cl',
      valenceElectrons: 7,
      octet: 8
    },
  ];

  return (
    <div className='simulation-page'>
      <h1>Lewis Structures</h1>
      <div className='simulation-container'>
        <div className='LS-element-container'>
          {lewisElements.map((element, index) => (
            <div
              key={index}
              className={`LS-element ${lewisElements.symbol}`}
            >
              <h1>
                {element.symbol}
              </h1>
            </div>
          ))}
        </div>
        <div id="LS-container" className='LS-container'>

        </div>
      </div>
    </div>
  );
};

export default withAuthorization(LewisStructure);

