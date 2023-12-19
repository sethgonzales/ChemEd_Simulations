import React from "react";
import Element from "./Element";

function DragDrop() {
  const lsElements = [
    {
      id: 1, //ids are atomic numbers
      symbol: 'H',
      valenceElectrons: 1,
      octet: 2,
    },
    {
      id: 5,
      symbol: 'B',
      valenceElectrons: 3,
      octet: 8,
    },
    {
      id: 6,
      symbol: 'C',
      valenceElectrons: 4,
      octet: 8,

    },
    {
      id: 7,
      symbol: 'N',
      valenceElectrons: 5,
      octet: 8,
    },
    {
      id: 8,
      symbol: 'O',
      valenceElectrons: 6,
      octet: 8,
    },
    {
      id: 9,
      symbol: 'F',
      valenceElectrons: 7,
      octet: 8,

    },
    {
      id: 17,
      symbol: 'Cl',
      valenceElectrons: 7,
      octet: 8,

    },
  ];



  return (
    <div className='simulation-page'>
      <h1>Lewis Structures</h1>
      <div className='simulation-container'>
        <div className="LS-element-container">
          {lsElements.map((element) => (
            <Element key={element.id} symbol={element.symbol} id={element.id} /> //left out the symbol, might need this
          ))}
        </div>
        <div className="LS-container">
          {/* Other Drag and Drop content goes here */}
        </div>
      </div>
    </div>
  );
}

export default DragDrop;
