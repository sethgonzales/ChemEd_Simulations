//Electron.js
import React, { useRef } from 'react';
import { Circle } from 'react-konva';


const Electron = ({ x, y, onClone, handleClick }) => {
  const electronRef = useRef();

  const handleClickLocal = () => {
    handleClick(electronRef.current);
  };

  const handleCloneLocal = (e) => {
    if (onClone) {
      const newX = e.target.x();
      const newY = e.target.y();
      onClone({ x: newX, y: newY });
    }
  };

  return (
    <React.Fragment>
      <Circle
        x={x}
        y={y}
        fill="white"
        radius={3}
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
        onTap={handleClickLocal}
      />
    </React.Fragment>

  );
};

export default Electron;