import React, { useState, useEffect } from 'react';
import { Stage, Layer, Circle } from 'react-konva';
import './StatesOfMatter.css';

const StatesOfMatter = () => {
  let animationFrame; 
  const [temperature, setTemperature] = useState(25);
  const [molecules, setMolecules] = useState([]);

  const moveMolecules = () => {
    const updatedMolecules = molecules.map(molecule => {
      let updatedMolecule = { ...molecule }; // Create a copy of the molecule object
  
      // Molecule movement logic
      if (temperature < 0) {
        // Modify molecule properties for solid state movement
        // For example:
        updatedMolecule.dx = 0.5; // Some movement in x direction
        updatedMolecule.dy = 0.5; // Some movement in y direction
      } else if (temperature >= 0 && temperature <= 100) {
        // Modify molecule properties for liquid state movement
        // For example:
        updatedMolecule.dx = Math.random() * 2 - 1; // Random movement in x direction
        updatedMolecule.dy = Math.random() * 2 - 1; // Random movement in y direction
      } else {
        // Modify molecule properties for gas state movement
        // For example:
        updatedMolecule.dx = Math.random() * 4 - 2; // Random movement in x direction with higher speed
        updatedMolecule.dy = Math.random() * 4 - 2; // Random movement in y direction with higher speed
      }
  
      // Update molecule positions based on dx and dy
      updatedMolecule.x += updatedMolecule.dx;
      updatedMolecule.y += updatedMolecule.dy;
  
      // Wall collision detection - Adjust as needed
      if (updatedMolecule.x + updatedMolecule.radius > 400) {
        updatedMolecule.x = 400 - updatedMolecule.radius;
        updatedMolecule.dx = -updatedMolecule.dx;
      } else if (updatedMolecule.x - updatedMolecule.radius < 0) {
        updatedMolecule.x = updatedMolecule.radius;
        updatedMolecule.dx = -updatedMolecule.dx;
      }
  
      if (updatedMolecule.y + updatedMolecule.radius > 400) {
        updatedMolecule.y = 400 - updatedMolecule.radius;
        updatedMolecule.dy = -updatedMolecule.dy;
      } else if (updatedMolecule.y - updatedMolecule.radius < 0) {
        updatedMolecule.y = updatedMolecule.radius;
        updatedMolecule.dy = -updatedMolecule.dy;
      }
  
      return updatedMolecule; // Return the updated molecule object
    });
  
    setMolecules(updatedMolecules);
  
    // Request next animation frame after updating the state
    animationFrame = window.requestAnimationFrame(moveMolecules); // Assign the value
  };
  

  useEffect(() => {
    const moleculeCount = 40;
    const moleculeInfo = {
      radius: 5,
      speed: temperature / 5,
    };

    const initialMolecules = Array.from({ length: moleculeCount }, () => ({
      x: Math.random() * 400, // Set your canvas width here
      y: Math.random() * 400, // Set your canvas height here
      dx: 0,
      dy: 0,
      ...moleculeInfo,
    }));

    setMolecules(prevMolecules => [...prevMolecules, ...initialMolecules]);

    // Start the animation loop
    moveMolecules();

    // Clean up animation frame on component unmount
    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [temperature]);


 // Run this effect whenever temperature changes
  const handleSliderChange = event => {
    const newTemperature = parseFloat(event.target.value);
    if (!isNaN(newTemperature) && newTemperature >= -20 && newTemperature <= 120) {
      setTemperature(newTemperature);
    }
  };

  return (
    <div className='simulation'>
      <h1>States of Matter</h1>
      <Stage width={400} height={400}>
        <Layer>
          {molecules.map((molecule, index) => (
            <Circle
              key={index}
              x={molecule.x}
              y={molecule.y}
              radius={molecule.radius}
              fill='#fff'
            />
          ))}
        </Layer>
      </Stage>
      <label htmlFor="temperature-slider">Temperature:</label>
      <input
        type="range"
        id="temperature-slider"
        min="-20"
        max="120"
        value={temperature}
        onChange={handleSliderChange}
      />
      <span>{temperature}</span> 
      {/* Button for starting animation */}
      <button
        id="start-btn"
        className="btn"
        onClick={() => {
          // Start the animation loop again
          moveMolecules();
        }}
      >
        Start
      </button>
    </div>
  );
};


export default StatesOfMatter;
