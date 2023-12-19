import React, { useState, useRef, useEffect } from 'react';
import { Group, Circle } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';

const Electron = ({ x, y, distanceApart = 10, onClone, transformerRef, onDelete }) => {
  const [selected, setSelected] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const elementRef = useRef();

  const handleDragMove = (e) => {
    const newPosition = {
      x: e.target.x(),
      y: e.target.y(),
    };
    setPosition(newPosition);
  };

  const handleClone = () => {
    if (onClone) {
      const newId = uuidv4();
      onClone({ id: newId, x: position.x, y: position.y });
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
          handleClone(e);
        }
      }}
      ref={elementRef}
      onClick={handleClick}
    >
      <Circle radius={3} fill="white" />
      <Circle x={distanceApart} radius={3} fill="white" />
    </Group>
  );
};

export default Electron;
