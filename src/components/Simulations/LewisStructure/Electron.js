//Electron.js
import React, { useState, useRef } from 'react';
import { Group, Circle } from 'react-konva';


const Electron = ({ x, y, distanceApart = 10, onClone, handleClick }) => {
  const [position, setPosition] = useState({ x, y });
  const [radius, setRadius] = useState(3);
  const electronRef = useRef();

  const handleDragMove = (e) => {
    const newPosition = {
      x: e.target.x(),
      y: e.target.y(),
    };
    setPosition(newPosition);
  };
  
  const handleTransform = (e) => {
    const scaleX = e.currentTarget.getClientRect().width / e.currentTarget.width();
    const scaleY = e.currentTarget.getClientRect().height / e.currentTarget.height();
    const newRadius = radius * Math.max(scaleX, scaleY);
    setRadius(newRadius);
  };  

  const handleClickLocal = () => {
    handleClick(electronRef.current);
  };

  const handleCloneLocal = () => {
    if (onClone) {
      onClone({ x: position.x, y: position.y, radius });
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
      ref={electronRef}
      onClick={handleClickLocal}
      onTransform={handleTransform}
    >
      <Circle radius={radius} fill="white" />
      <Circle x={distanceApart} radius={radius} fill="white" />
    </Group>
  );
};

export default Electron;