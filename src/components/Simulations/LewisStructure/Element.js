import React from "react";
import { useDrag } from 'react-dnd';


function Element({ id, symbol }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "element-div", //id the type of object you are moving.. Made up the name
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div className="LS-element">
      <p>{symbol}</p>
    </div>
  )
}

export default Element