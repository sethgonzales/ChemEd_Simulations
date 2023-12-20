//Electron.js
import React, { useState, useRef } from 'react';
import { Group, Circle } from 'react-konva';


const ElectronPair = ({ x, y, distanceApart = 10, onClone, handleClick }) => {
  const [position, setPosition] = useState({ x, y });
  const electronPairRef = useRef();

  const handleDragMove = (e) => {
    const newPosition = {
      x: e.target.x(),
      y: e.target.y(),
    };
    setPosition(newPosition);
  };
  

  const handleClickLocal = () => {
    handleClick(electronPairRef.current);
  };

  const handleCloneLocal = () => {
    if (onClone) {
      onClone({ x: position.x, y: position.y });
    }
  };

  return (
    <Group
      x={position.x}
      y={position.y}
      draggable
      onDragMove={handleDragMove}
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
      ref={electronPairRef}
      onClick={handleClickLocal}
    >
      <Circle radius={3} fill="white" />
      <Circle x={distanceApart} radius={3} fill="white" />
    </Group>
  );
};

export default ElectronPair;