//Element.js
import React, { useRef } from 'react';
import { Text } from 'react-konva';

const Element = ({ x, y, text, onClone, handleClick, updateEntityPosition, entityType }) => {
  const elementRef = useRef();

  const handleCloneLocal = (e) => {
    if (onClone) {
      const newX = e.target.x(); // Get the current X coordinate of the element
      const newY = e.target.y(); // Get the current Y coordinate of the element
      onClone({ x: newX, y: newY, text }); // Pass the current coordinates and text for cloning
    }
  };

  const handleClickLocal = () => {
    handleClick(elementRef.current);
  };

  const handleElementDrag = (e) => {
    const id = e.target.id();
    const newX = e.target.x();
    const newY = e.target.y();

    updateEntityPosition(id, newX, newY, entityType);
  };

  return (
    <React.Fragment>
      <Text
        x={x}
        y={y}
        text={text}
        fontSize={30}
        fill="white"
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
        ref={elementRef}
        onClick={handleClickLocal}
        onDragMove={handleElementDrag} 
      />
    </React.Fragment>
  );
};


export default Element;