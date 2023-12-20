//LewisStructure.js
import React, { useState, useRef } from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import Element from './Element';
import Bond from './Bond';
import Electron from './Electron';
import { v4 as uuidv4 } from 'uuid';
import withAuthorization from './../../Account/withAuthorization';
import './LewisStructure.css';
import withSelection from './withSelection';


const ElementWithSelection = withSelection(Element);

const LewisStructure = () => {
  const transformerRef = useRef(null);
  const elementRefs = useRef([]);
  const bondRefs = useRef([]);
  const electronRefs = useRef([]);

  const [elements, setElements] = useState([
    { id: uuidv4(), x: 10, y: 10, text: 'H' },
    { id: uuidv4(), x: 30, y: 10, text: 'C' },
    { id: uuidv4(), x: 50, y: 10, text: 'N' },
    { id: uuidv4(), x: 70, y: 10, text: 'O' },
    { id: uuidv4(), x: 90, y: 10, text: 'F' },
    // Other elements...
  ]);

  const [bonds, setBonds] = useState([
    { id: uuidv4(), points: [10, 20, 40, 20], x: 110, y: 0 }, // Sample bond between elements
    // Other bonds...
  ]);

  const [electrons, setElectrons] = useState([
    { id: uuidv4(), x: 170, y: 20 }, // Sample electron position
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

  const handleClick = (itemRef) => {
    const node = itemRef.current;
    if (node && transformerRef.current) {
      const isSelected = transformerRef.current.nodes().indexOf(node) !== -1;
      if (isSelected) {
        transformerRef.current.nodes([]); // Deselect if already selected
      } else {
        transformerRef.current.nodes([node]); // Select if not already selected
      }
    }
  };



  // const handleStageClick = (e) => {
  //   // If the click target is the stage, deselect any selected elements
  //   if (e.target === e.target.getStage()) {
  //     transformerRef.current.nodes([]);
  //   }
  // };

  const handleDeleteSelected = (itemType, stateUpdater) => {
    const selectedIds = transformerRef.current.nodes().map((node) => node.getAttr('id'));

    stateUpdater((prevState) =>
      prevState.filter((item) => !selectedIds.includes(item.id))
    );
  };


  return (
    <div className='simulation-page'>
      <div className='simulation-container'>
        <div className='LS-container'>
          <Stage width={800} height={400}>
            <Layer>
              {/* Render elements */}
              {elements.map((element, index) => (
                <ElementWithSelection
                  key={element.id}
                  x={element.x}
                  y={element.y}
                  text={element.text}
                  id={element.id}
                  onClone={handleCloneElement}
                />

              ))}

              {/* Render bonds */}
              {bonds.map((bond, index) => (
                <Bond
                  key={bond.id}
                  points={bond.points}
                  x={bond.x}
                  y={bond.y}
                  id={bond.id}
                  onClone={handleCloneBond}
                  transformerRef={transformerRef}
                  onClick={() => handleClick(bondRefs.current[index])}
                  bondRef={(el) => (bondRefs.current[index] = el)}
                />
              ))}

              {/* Render electrons */}
              {electrons.map((electron, index) => (
                <Electron
                  key={electron.id}
                  x={electron.x}
                  y={electron.y}
                  id={electron.id}
                  onClone={handleCloneElectron}
                  transformerRef={transformerRef}
                  onClick={() => handleClick(electronRefs.current[index])}
                  electronRef={(el) => (electronRefs.current[index] = el)}
                />
              ))}
              <Transformer ref={transformerRef} />
            </Layer>
          </Stage>
          <button onClick={() => handleDeleteSelected('elements', setElements)}>Delete Selected</button>

        </div>
      </div>
    </div>
  );
};

export default withAuthorization(LewisStructure);

