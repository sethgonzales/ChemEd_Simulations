//withSelection.js
import React, { useState } from 'react';

const withSelection = (WrappedComponent) => {
  const WithSelection = (props) => {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
      setSelected(!selected);
      // Add any additional logic here when an item is selected/unselected
    };

    return (
      <WrappedComponent
        {...props}
        selected={selected}
        onClick={handleClick}
      />
    );
  };

  return WithSelection;
};

export default withSelection;
