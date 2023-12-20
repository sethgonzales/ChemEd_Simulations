import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import Element from './Element';
import Bond from './Bond';
import Electron from './Electron';
import { v4 as uuidv4 } from 'uuid';
import withAuthorization from './../../Account/withAuthorization';
import './LewisStructure.css';


const LewisStructure = () => {
  const transformerRef = useRef(null);

  //deal with state history/snapshots for undo/redo
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  
  const addToHistory = (snapshot) => {
    const lastEntry = history[currentStep];
  
    // Check if the new snapshot is different from the last entry in history
    const isDifferentSnapshot =
      JSON.stringify(snapshot) !== JSON.stringify(lastEntry);
  
    if (isDifferentSnapshot) {
      const newHistory = history.slice(0, currentStep + 1);
      newHistory.push(snapshot);
      setHistory(newHistory);
      setCurrentStep(newHistory.length - 1);
    }
  };
  

  const handleStateChange = () => {
    const snapshot = {
      elements: elements.map((element) => ({ ...element })), // capture a copy of elements
      bonds: bonds.map((bond) => ({ ...bond })), // capture a copy of bonds
      electrons: electrons.map((electron) => ({ ...electron })), // capture a copy of electrons
    };
    addToHistory(snapshot);
    // Update elements, bonds, electrons based on user interactions
  };

  const updateEntityPosition = (id, newX, newY, entityType) => {
    switch (entityType) {
      case 'element':
        setElements((prevElements) =>
          prevElements.map((element) =>
            element.id === id ? { ...element, x: newX, y: newY } : element
          )
        );
        break;
      case 'bond':
        setBonds((prevBonds) =>
          prevBonds.map((bond) =>
            bond.id === id ? { ...bond, x: newX, y: newY } : bond
          )
        );
        break;
      case 'electron':
        setElectrons((prevElectrons) =>
          prevElectrons.map((electron) =>
            electron.id === id ? { ...electron, x: newX, y: newY } : electron
          )
        );
        break;
      default:
        break;
    }
    handleStateChange(); // Capture state change after updating position
  };


  //initial elements, bonds, and electrons
  const [elements, setElements] = useState([
    { id: uuidv4(), x: 10, y: 10, text: 'H' },
    { id: uuidv4(), x: 40, y: 10, text: 'C' },
    { id: uuidv4(), x: 70, y: 10, text: 'N' },
    { id: uuidv4(), x: 100, y: 10, text: 'O' },
    { id: uuidv4(), x: 130, y: 10, text: 'F' },
    // Other elements...
  ]);

  const [bonds, setBonds] = useState([
    { id: uuidv4(), points: [0, 20, 40, 20], x: 160, y: 0 },
    // Other bonds...
  ]);

  const [electrons, setElectrons] = useState([
    { id: uuidv4(), x: 220, y: 20 },
    // Other electrons...
  ]);


  //cloning items
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
      case 'electron':
        const newElectron = { id: uuidv4(), ...item };
        setElectrons([...electrons, newElectron]);
        break;
      default:
        break;
    }
    handleStateChange();
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
    handleStateChange();
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
    handleStateChange();
  };

  const handleUndoRedo = (e) => {
    if (e.metaKey && e.key === 'z') {
      e.preventDefault();
      if (e.shiftKey) {
        redo();
      } else {
        undo();
      }
    }
  };

  //undo/redo
  const undo = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => {
        console.log('Undo - Previous step:', prevStep);
        return prevStep - 1;
      });
    }
  };
  
  const redo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep((prevStep) => {
        console.log('Redo - Previous step:', prevStep);
        return prevStep + 1;
      });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleUndoRedo);
    return () => {
      window.removeEventListener('keydown', handleUndoRedo);
    };
  }, [currentStep]);

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
                  onClone={(item) => onClone('element', item)}
                  handleClick={handleClick}
                  updateEntityPosition={updateEntityPosition} // Pass the function
                  entityType="element"
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
                  updateEntityPosition={updateEntityPosition} // Pass the function
                  entityType="bond"
                />
              ))}

              {/* Render electrons */}
              {electrons.map((electron) => (
                <Electron
                  key={electron.id}
                  x={electron.x}
                  y={electron.y}
                  onClone={(item) => onClone('electron', item)}
                  handleClick={handleClick}
                  updateEntityPosition={updateEntityPosition} // Pass the function
                  entityType="electron"
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