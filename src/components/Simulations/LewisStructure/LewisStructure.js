import React, { useState } from 'react';
import './LewisStructure.css';
import withAuthorization from './../../Account/withAuthorization';
import { Stage, Layer } from 'react-konva';
import Element from './Element';
import Bond from './Bond';
import Electron from './Electron';
import { v4 as uuidv4 } from 'uuid';


const LewisStructure = () => {
  const [elements, setElements] = useState([
    { id: uuidv4(), x: 10, y: 10, text: 'H' },
    { id: uuidv4(), x: 30, y: 10, text: 'C' },
    { id: uuidv4(), x: 50, y: 10, text: 'N' },
    { id: uuidv4(), x: 70, y: 10, text: 'O' },
    { id: uuidv4(), x: 90, y: 10, text: 'F' },
    // Other elements...
  ]);

  const [bonds, setBonds] = useState([
    { id: uuidv4(), points: [10, 20, 40, 20], x: 30, y: 10 }, // Sample bond between elements
    // Other bonds...
  ]);

  const [electrons, setElectrons] = useState([
    { id: uuidv4(), x: 150, y: 150 }, // Sample electron position
    // Other electrons...
  ]);
  const handleCloneElement = ({ x, y, text }) => {
    const newElement = { id: uuidv4(), x, y, text };
    setElements([...elements, newElement]);
  };

  const handleCloneBond = ({ points, x, y }) => {
    const newBond = { id: uuidv4(), points, x, y };
    setBonds([...bonds, newBond]);
  };

  const handleCloneElectron = ({ x, y }) => {
    const newElectron = { id: uuidv4(), x, y };
    setElectrons([...electrons, newElectron]);
  };



  return (
    <div className='simulation-page'>
      <div className='simulation-container'>
        <div className='LS-container'>
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
              {/* Render elements */}
              {elements.map((element) => (
                <Element
                  key={element.id}
                  x={element.x}
                  y={element.y}
                  text={element.text}
                  onClone={handleCloneElement}

                />
              ))}

              {/* Render bonds */}
              {bonds.map((bond) => (
                <Bond
                  key={bond.id}
                  points={bond.points}
                  x={bond.x}
                  y={bond.y}
                  onClone={handleCloneBond}
                />
              ))}


              {/* Render electrons */}
              {electrons.map((electron) => (
                <Electron
                  key={electron.id}
                  x={electron.x}
                  y={electron.y}
                  onClone={handleCloneElectron}
                />
              ))}

            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};



export default withAuthorization(LewisStructure);

