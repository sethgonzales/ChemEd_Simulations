// Bond.js
import React, { useState } from 'react';

import { Line } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';

const Bond = ({ points, x, y, onClone }) => {
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleClone = (e) => {
    if (onClone) {
      const newX = e.target.x();
      const newY = e.target.y();
      const newId = uuidv4();
      onClone({ id: newId, x: newX, y: newY, points, rotation: rotationAngle });
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
      rotation={rotationAngle}
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
      onDragMove={(e) => {
        setRotationAngle(e.target.rotation()); 
      }}

    />
  );
};

export default Bond;
