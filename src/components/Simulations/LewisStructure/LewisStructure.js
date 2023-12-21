//LewisStructure.js
import React, { useState, useRef } from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import Element from './Element';
import Bond from './Bond';
import DoubleBond from './DoubleBond';
import ElectronPair from './ElectronPair';
import Electron from './Electron';
import { v4 as uuidv4 } from 'uuid';
import withAuthorization from './../../Account/withAuthorization';
import './LewisStructure.css';


const LewisStructure = () => {
  const transformerRef = useRef(null);

  const [elements, setElements] = useState([
    { id: uuidv4(), x: 15, y: 10, text: 'H' },
    { id: uuidv4(), x: 210, y: 10, text: 'He' },
    { id: uuidv4(), x: 35, y: 50, text: 'B' },
    { id: uuidv4(), x: 70, y: 50, text: 'C' },
    { id: uuidv4(), x: 105, y: 50, text: 'N' },
    { id: uuidv4(), x: 140, y: 50, text: 'O' },
    { id: uuidv4(), x: 175, y: 50, text: 'F' },
    { id: uuidv4(), x: 210, y: 50, text: 'Ne' },
    { id: uuidv4(), x: 70, y: 90, text: 'Si' },
    { id: uuidv4(), x: 105, y: 90, text: 'P' },
    { id: uuidv4(), x: 140, y: 90, text: 'S' },
    { id: uuidv4(), x: 175, y: 90, text: 'Cl' },
    { id: uuidv4(), x: 210, y: 90, text: 'Ar' },
    { id: uuidv4(), x: 140, y: 130, text: 'Se' },
    { id: uuidv4(), x: 175, y: 130, text: 'Br' },
    { id: uuidv4(), x: 210, y: 130, text: 'Kr' },
    { id: uuidv4(), x: 175, y: 170, text: 'I' },
    { id: uuidv4(), x: 210, y: 170, text: 'Xe' },
    // Other elements...
  ]);

  const [bonds, setBonds] = useState([
    { id: uuidv4(), points: [0, 20, 40, 20], x: 310, y: 0 },
  ]);
  const [doubleBonds, setDoubleBonds] = useState([
    { id: uuidv4(), x: 310, y: 50 },
  ]);

  const [electrons, setElectrons] = useState([
    { id: uuidv4(), x: 400, y: 20 },
  ]);

  const [electronPair, setElectronPair] = useState([
    { id: uuidv4(), x: 430, y: 20 },
  ]);


  const onClone = (type, item) => {
    switch (type) {
      case 'element':
        const newElement = { id: uuidv4(), ...item };
        setElements([...elements, newElement]);
        break;
      case 'bond':
        const newBond = { id: uuidv4(), ...item };
        setBonds([...bonds, newBond]);
        break;
      case 'doubleBond':
        const newDoubleBonds = { id: uuidv4(), ...item };
        setDoubleBonds([...doubleBonds, newDoubleBonds]);
        break;
      case 'electron':
        const newElectron = { id: uuidv4(), ...item };
        setElectrons([...electrons, newElectron]);
        break;
      case 'electronPair':
        const newElectronPair = { id: uuidv4(), ...item };
        setElectronPair([...electronPair, newElectronPair]);
        break;
      default:
        break;
    }
  };

  // If the click target is the stage, deselect any selected elements
  const handleStageClick = (e) => {
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
          <Stage width={1200} height={400} onClick={handleStageClick}>
            <Layer>
              {/* Render elements */}
              {elements.map((element) => (
                <Element
                  key={element.id}
                  x={element.x}
                  y={element.y}
                  text={element.text}
                  onClone={(item) => onClone('element', item)}
                  handleClick={handleClick}
                />

              ))}

              {/* Render bonds */}
              {bonds.map((bond) => (
                <Bond
                  key={bond.id}
                  points={bond.points}
                  x={bond.x}
                  y={bond.y}
                  onClone={(item) => onClone('bond', item)}
                  handleClick={handleClick}
                />
              ))}

              {/* Render double bonds */}
              {doubleBonds.map((doubleBond) => (
                <DoubleBond
                  key={doubleBond.id}
                  x={doubleBond.x}
                  y={doubleBond.y}
                  onClone={(item) => onClone('doubleBond', item)}
                  handleClick={handleClick}
                />
              ))}

              {/* Render electron pairs */}
              {
                electronPair.map((electronPair) => (
                  <ElectronPair
                    key={electronPair.id}
                    x={electronPair.x}
                    y={electronPair.y}
                    onClone={(item) => onClone('electronPair', item)}
                    handleClick={handleClick}
                  />
                ))
              }
              < Transformer ref={transformerRef} />

              {/* Render electrons */}
              {
                electrons.map((electron) => (
                  <Electron
                    key={electron.id}
                    x={electron.x}
                    y={electron.y}
                    onClone={(item) => onClone('electron', item)}
                    handleClick={handleClick}
                  />
                ))
              }
              < Transformer ref={transformerRef} />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default withAuthorization(LewisStructure);