// Bond.js
import React from 'react';
import { Line } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';

const Bond = ({ points, x, y, onClone }) => {
  const handleClone = (e) => {
    if (onClone) {
      const newX = e.target.x();
      const newY = e.target.y();
      const newId = uuidv4();
      onClone({ id: newId, x: newX, y: newY, points }); // Cloning the bond with current coordinates
    }
  };

  return (
    <Line
      x={x}
      y={y}
      points={points}
      stroke="white"
      strokeWidth={4}
      draggable
      onMouseDown={(e) => {
        if (e.evt.metaKey || e.evt.ctrlKey) {
          handleClone(e);
        }
      }}
    />
  );
};

export default Bond;
