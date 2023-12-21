//DoubleBond.js
import React, { useState, useRef, useEffect } from 'react';
import { Group, Line } from 'react-konva';


const DoubleBond = ({ x, y, distanceApart = 10, onClone, handleClick }) => {
  const [position, setPosition] = useState({ x, y });
  const doubleBondRef = useRef();
  const bondWidth = 40;

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

  useEffect(() => {
    // Calculate the dimensions of the bounding box based on the content
    const rect = doubleBondRef.current.getClientRect();
    doubleBondRef.current.setAttrs({
      width: rect.width,
      height: rect.height,
      offsetX: rect.width / 2,
      offsetY: rect.height / 2,
    });
  }, []);

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
      onTap={handleClickLocal}
    >
      <Line points={[0, 0, bondWidth, 0]} strokeWidth={4} stroke="white" />
      <Line points={[0, distanceApart, bondWidth, distanceApart]} strokeWidth={4} stroke="white" />
    </Group>
  );
};

export default DoubleBond;
