// CommonUtils.js
// CommonUtils.js

export const createHandleClone = (onClone, transformerRef) => {
  return (attributes) => {
    const handleClone = () => {
      if (onClone && transformerRef.current) {
        // Logic for cloning elements based on provided attributes
        // For example:
        const newId = uuidv4();
        const newX = attributes.x;
        const newY = attributes.y;
        onClone({ id: newId, x: newX, y: newY, ...attributes });
      }
    };
    return handleClone;
  };
};

export const createHandleClick = (transformerRef, elementRef, onDelete) => {
  return () => {
    const handleClick = () => {
      if (elementRef.current && transformerRef.current) {
        const isSelected = transformerRef.current.nodes().indexOf(elementRef.current) !== -1;
        if (isSelected) {
          transformerRef.current.nodes([]);
        } else {
          transformerRef.current.nodes([elementRef.current]);
        }
      }

      const isSelected = transformerRef.current.nodes().indexOf(elementRef.current) !== -1;
      if (isSelected && onDelete) {
        onDelete();
      }
    };

    return handleClick;
  };
};


export const createHandleKeyPress = (selected, onDelete) => {
  return (e) => {
    const handleKeyPress = () => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selected && onDelete) {
        onDelete();
      }
    };

    return handleKeyPress;
  };
};

// SharedHooks.js
export const useNodeSelection = (transformerRef, elementRef) => {
  // Logic for managing node selection
};

// CombinedComponent.js (Combined Element, Bond, Electron)
// Use props to differentiate between the types (element, bond, electron)
const CombinedComponent = ({ type, ...props }) => {
  // Generalized logic based on type prop
};

// LewisStructure.js
// Instead of importing Element, Bond, and Electron separately, use CombinedComponent

// Refactor the rest of the code to utilize the shared utilities and components.
