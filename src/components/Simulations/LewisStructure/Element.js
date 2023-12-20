//Element.js
import React, { useState, useRef, useEffect } from 'react';
import { Text } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';


const Element = ({ x, y, text, onClone, transformerRef, onDelete }) => {
  const [selected, setSelected] = useState(false);
  const elementRef = useRef();

  const handleClone = (e) => {
    if (onClone) {
      const newX = e.target.x(); // Get the current X coordinate of the element
      const newY = e.target.y(); // Get the current Y coordinate of the element
      const newId = uuidv4(); // Generate a new unique ID
      onClone({ id: newId, x: newX, y: newY, text }); // Pass the current coordinates and text for cloning
    }
  };

  const handleClick = () => {
    const node = elementRef.current;
    if (node && transformerRef.current) {
      const isSelected = transformerRef.current.nodes().indexOf(node) !== -1;
      if (!isSelected) {
        transformerRef.current.nodes([node]);
      } else {
        transformerRef.current.nodes([]); // Deselect the element instead of deleting it
      }
    }
  };

  useEffect(() => {
    if (transformerRef.current) {
      const isSelected = transformerRef.current.nodes().indexOf(elementRef.current) !== -1;
      setSelected(isSelected);
    }
  }, [transformerRef]);


  return (
    <Text
      x={x}
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
          handleClone(e);
        }
      }}
      ref={elementRef}
      onClick={handleClick}
    />
  );
};


export default Element;
