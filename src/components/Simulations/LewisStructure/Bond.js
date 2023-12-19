// Bond.js
import React, { useState, useRef, useEffect } from 'react';
import { Line } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';

const Bond = ({ points, x, y, onClone, transformerRef, onDelete  }) => {
  const [selected, setSelected] = useState(false);
  const elementRef = useRef();

  const handleClone = (e) => {
    if (onClone) {
      const newX = e.target.x();
      const newY = e.target.y();
      const newId = uuidv4();
      onClone({ id: newId, x: newX, y: newY, points });
    }
  };

  const handleClick = () => {
    const node = elementRef.current;
    if (node && transformerRef.current) {
      const isSelected = transformerRef.current.nodes().indexOf(node) !== -1;
      if (isSelected) {
        transformerRef.current.nodes([]);
      } else {
        transformerRef.current.nodes([node]);
      }
    }

    const isSelected = transformerRef.current.nodes().indexOf(elementRef.current) !== -1;
    if (isSelected && onDelete) {
      onDelete();
    }
  };

  useEffect(() => {
    // Listen for the node selection change
    if (transformerRef.current) {
      const isSelected = transformerRef.current.nodes().indexOf(elementRef.current) !== -1;
      setSelected(isSelected);
    }
  }, [transformerRef]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selected && onDelete) {
        onDelete();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onDelete, selected]);


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
          handleClone(e);
        }
      }}
      ref={elementRef}
      onClick={handleClick}
    />
  );
};

export default Bond;
