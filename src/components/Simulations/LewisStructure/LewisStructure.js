//LewisStructure.js
import React, { useState, useRef } from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import Element from './Element';
import Bond from './Bond';
import Electron from './Electron';
import { v4 as uuidv4 } from 'uuid';
import withAuthorization from './../../Account/withAuthorization';
import './LewisStructure.css';


const LewisStructure = () => {
  const transformerRef = useRef(null);

  const [elements, setElements] = useState([
    { id: uuidv4(), x: 10, y: 10, text: 'H' },
    { id: uuidv4(), x: 40, y: 10, text: 'C' },
    { id: uuidv4(), x: 70, y: 10, text: 'N' },
    { id: uuidv4(), x: 100, y: 10, text: 'O' },
    { id: uuidv4(), x: 130, y: 10, text: 'F' },
    // Other elements...
  ]);

  const [bonds, setBonds] = useState([
    { id: uuidv4(), points: [0, 20, 40, 20], x: 160, y: 0 }, // Sample bond between elements
    // Other bonds...
  ]);

  const [electrons, setElectrons] = useState([
    { id: uuidv4(), x: 220, y: 20 }, // Sample electron position
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

  const handleStageClick = (e) => {
    // If the click target is the stage, deselect any selected elements
    if (e.target === e.target.getStage()) {
      transformerRef.current.nodes([]);
    }
  };

  const handleKeyPress = (event) => {
    if ((event.key === 'Delete' || event.key === 'Backspace') && transformerRef.current) {
      const selectedNodes = transformerRef.current.nodes();
      if (selectedNodes.length > 0) {
        selectedNodes.forEach((selectedNode) => {
          selectedNode.remove();
        });
        transformerRef.current.nodes([]);
      }
    }
  };

  const handleClick = (node) => {
    if (node && transformerRef.current) {
      const isSelected = transformerRef.current.nodes().indexOf(node) !== -1;
  
      if (!isSelected) {
        transformerRef.current.nodes([node]);
        document.addEventListener('keydown', handleKeyPress);
      } else {
        const selectedNodes = transformerRef.current.nodes();
        if (selectedNodes.length > 0) {
          transformerRef.current.nodes([]);
        }
        document.removeEventListener('keydown', handleKeyPress);
      }
    }
  };
  
  return (
    <div className='simulation-page'>
      <div className='simulation-container'>
        <div className='LS-container'>
          <Stage width={800} height={400} onClick={handleStageClick}>
            <Layer>
              {/* Render elements */}
              {elements.map((element) => (
                <Element
                  key={element.id}
                  x={element.x}
                  y={element.y}
                  text={element.text}
                  id={element.id}
                  onClone={handleCloneElement}
                  transformerRef={transformerRef}
                  handleKeyPress={handleKeyPress} // Pass handleKeyPress as a prop
                  handleClick={handleClick} // Pass handleClick as a prop

                />

              ))}

              {/* Render bonds */}
              {bonds.map((bond) => (
                <Bond
                  key={bond.id}
                  points={bond.points}
                  x={bond.x}
                  y={bond.y}
                  id={bond.id}
                  onClone={handleCloneBond}
                  transformerRef={transformerRef}
                />
              ))}

              {/* Render electrons */}
              {electrons.map((electron) => (
                <Electron
                  key={electron.id}
                  x={electron.x}
                  y={electron.y}
                  id={electron.id} // Add an id attribute
                  onClone={handleCloneElectron}
                  transformerRef={transformerRef}
                />
              ))}
              <Transformer ref={transformerRef} />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default withAuthorization(LewisStructure);