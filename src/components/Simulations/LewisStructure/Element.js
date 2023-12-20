//Element.js
import React, { useState, useRef, useEffect } from 'react';
import { Text } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';
import withSelection from './withSelection';



const Element = ({ x, y, text, onClone, onClick, selected }) => {

  const handleClone = (e) => {
    if (onClone) {
      const newX = e.target.x(); // Get the current X coordinate of the element
      const newY = e.target.y(); // Get the current Y coordinate of the element
      const newId = uuidv4(); // Generate a new unique ID
      onClone({ id: newId, x: newX, y: newY, text }); // Pass the current coordinates and text for cloning
    }
  };

  return (
    <Text
      x={x}
      y={y}
      text={text}
      fontSize={20}
      fill={selected ? 'red' : 'white'}
      draggable
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
      onClick={onClick}
    />
  );
};


export default withSelection(Element);

