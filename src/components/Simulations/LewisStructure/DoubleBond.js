//DoubleBond.js
import React, { useState, useRef } from 'react';
import { Group, Line } from 'react-konva';


const DoubleBond = ({ x, y, distanceApart = 10, onClone, handleClick }) => {
  const [position, setPosition] = useState({ x, y });
  const doubleBondRef = useRef();

  const handleDragMove = (e) => {
    const newPosition = {
      x: e.target.x(),
      y: e.target.y(),
    };
    setPosition(newPosition);
  };
  

  const handleClickLocal = () => {
    handleClick(doubleBondRef.current);
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
      ref={doubleBondRef}
      onClick={handleClickLocal}
    >
      <Line points={[0, 0, 40, 0]}strokeWidth='4' stroke="white" />
      <Line points={[0, distanceApart, 40, distanceApart]} strokeWidth='4' stroke="white" />

    </Group>
  );
};

export default DoubleBond;