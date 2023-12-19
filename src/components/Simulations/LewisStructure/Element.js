import React from "react";
import { useDrag } from 'react-dnd';


function Element({ id, symbol }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "element-div", //id the type of object you are moving.. Made up the name
    // collect: (monitor) => ({ //def prop that is accessible, pass isDragging if we want to monitor if we are dragging an element. This is good for conditional styling... Dont need yet
    //   isDragging: !!monitor.isDragging(),
    // }),
    item: {id: id}
  }));

  return (
    <div className="LS-element" ref={drag}>
      <p>{symbol}</p>
    </div>
  )
}

export default Element