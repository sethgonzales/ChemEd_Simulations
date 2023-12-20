//Electron.js
import React, { useState, useRef } from 'react';
import { Group, Circle } from 'react-konva';

const Electron = ({ x, y, distanceApart = 10, onClone, handleClick, updateEntityPosition, entityType }) => {
  const [position, setPosition] = useState({ x, y });
  const electronRef = useRef();

  const handleClickLocal = () => {
    handleClick(electronRef.current);
  };

  const handleCloneLocal = () => {
    if (onClone) {
      onClone({ x: position.x, y: position.y });
    }
  };

  const handleElectronDrag = (e) => {
    const newPosition = {
      x: e.target.x(),
      y: e.target.y(),
    };
    setPosition(newPosition);
  
    const id = e.target.id();
    const newX = e.target.x();
    const newY = e.target.y();
  
    updateEntityPosition(id, newX, newY, entityType);
  };


  return (
    <Group
      x={position.x}
      y={position.y}
      draggable
      onMouseOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onMouseOut={() => {
        document.body.style.cursor = 'default';
      }}
      onMouseDown={(e) => {
        if (e.evt.metaKey || e.evt.ctrlKey) {
          handleCloneLocal(e);
        }
      }}
      ref={electronRef}
      onClick={handleClickLocal}
      onDragMove={handleElectronDrag}
    >
      <Circle radius={3} fill="white" />
      <Circle x={distanceApart} radius={3} fill="white" />
    </Group>
  );
};

export default Electron;