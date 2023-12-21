// Bond.js
import React, { useRef } from 'react';
import { Line } from 'react-konva';

const Bond = ({ points, x, y, onClone, handleClick }) => {
  const bondRef = useRef();

  const handleCloneLocal = (e) => {
    if (onClone) {
      const newX = e.target.x();
      const newY = e.target.y();
      onClone({ x: newX, y: newY, points });
    }
  };

  const handleClickLocal = () => {
    handleClick(bondRef.current);
  };

  return (
    <Line
      x={x}
      y={y}
      points={points}
      stroke="white"
      strokeWidth={4}
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
      ref={bondRef}
      onClick={handleClickLocal}
      onTap={handleClickLocal}
    />
  );
};

export default Bond;