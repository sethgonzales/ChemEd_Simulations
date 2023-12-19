import React, { useState } from 'react';
import { Group, Circle } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';

const Electron = ({ x, y, distanceApart = 10, onClone }) => {
  const [position, setPosition] = useState({ x, y });

  const handleDragMove = (e) => {
    // Update the position for both circles when dragging
    const newPosition = {
      x: e.target.x(),
      y: e.target.y(),
    };
    setPosition(newPosition);
  };

  const handleClone = () => {
    if (onClone) {
      const newId = uuidv4();
      onClone({ id: newId, x: position.x, y: position.y }); // Cloning the electron with current coordinates
    }
  };

  return (
    <Group 
    x={position.x} 
    y={position.y} 
    draggable onDragMove={handleDragMove} 
    onMouseOver={() => {
      document.body.style.cursor = 'pointer';
    }}
    onMouseOut={() => {
      document.body.style.cursor = 'default';
    }}
    onMouseDown={(e) => {
        if (e.evt.metaKey || e.evt.ctrlKey) {
          handleClone(e);
        }
      }}
    >
      <Circle radius={3} fill="white" />
      <Circle x={distanceApart} radius={3} fill="white" />
    </Group>
  );
};

export default Electron;
