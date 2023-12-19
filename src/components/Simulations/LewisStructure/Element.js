// Element.js
import React from 'react';
import { Stage, Layer, Text, Transformer } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';


const Element = ({ x, y, text, onClone }) => {
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
      x={x}a
      y={y}
      text={text}
      fontSize={20}
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
          handleClone(e); // Pass the event to get the current coordinates during click
        }
      }}
    />
  );
};


export default Element;
