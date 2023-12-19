import React, { useState } from "react";
import Element from "./Element";
import { useDrop } from "react-dnd";



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

  const [lsBoard, setLsBoard] = useState([]); //monitors which elements are in the ls container

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "element-div",
    drop: (element) => addElementToBoard(element.id), //function whenever we drop an item, id which element we are adding to the board
    collect: (monitor) => ({ 
      isOver: !!monitor.isOver(),
    }),
  }))

  const addElementToBoard = (id) => { //id element and add to our board
    const elementList = lsElements.filter((element) => id === element.id);
    setLsBoard((lsBoard) => [...lsBoard, elementList[0]]); //make copy of state with new element added
  }
  return (
    <div className='simulation-page'>
      <h1>Lewis Structures</h1>
      <div className='simulation-container'>
        <div className="LS-element-container">
          {lsElements.map((element) => (
            <Element key={element.id} symbol={element.symbol} id={element.id} />
          ))}
        </div>
        <div className="LS-container" ref={drop}>
          {lsBoard.map((element) => (
            <Element key={element.id} symbol={element.symbol} id={element.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DragDrop;
