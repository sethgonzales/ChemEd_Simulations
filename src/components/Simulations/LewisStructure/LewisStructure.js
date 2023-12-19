


import React, { useState, useCallback } from 'react'; // Import useCallback from React
import './LewisStructure.css';
import withAuthorization from './../../Account/withAuthorization';
import {
  useDraggable,
  useDroppable,
  DndContext,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
} from '@dnd-kit/core';

const DraggableElement = ({ id, symbol }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id.toString(),
  });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };
  console.log(`Element ${symbol} is being dragged. Transform:`, transform);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='LS-element'
    >
      <p>{symbol}</p>
    </div>

  );
};

const DroppableContainer = ({ containerId, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: containerId.toString(),
  });
  const containerClassName = containerId === 'LS-container' ? 'LS-element-container' : 'OtherClassName';
  const style = {
    backgroundColor: isOver ? 'lightblue' : '',
  };

  return (
    <div ref={setNodeRef} className={containerClassName} style={style}>
      {children} {/* Render the draggable elements here */}
    </div>
  );
};





const LewisStructure = () => {
  const [elements, setElements] = useState([
    {
      id: 1,
      symbol: 'H',
      valenceElectrons: 1,
      octet: 2,
      droppableId: 'LS-container'
    },
    {
      id: 2,
      symbol: 'B',
      valenceElectrons: 3,
      octet: 8,
      droppableId: 'LS-container'
    },
    {
      id: 3,
      symbol: 'C',
      valenceElectrons: 4,
      octet: 8,
      droppableId: 'LS-container'

    },
    {
      id: 4,
      symbol: 'N',
      valenceElectrons: 5,
      octet: 8,
      droppableId: 'LS-container'

    },
    {
      id: 5,
      symbol: 'O',
      valenceElectrons: 6,
      octet: 8,
      droppableId: 'LS-container'

    },
    {
      id: 6,
      symbol: 'F',
      valenceElectrons: 7,
      octet: 8,
      droppableId: 'LS-container'

    },
    {
      id: 7,
      symbol: 'Cl',
      valenceElectrons: 7,
      octet: 8,
      droppableId: 'LS-container'

    },
  ]);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = useCallback((event) => {
    const { over } = event;
  
    if (over) {
      const draggedElement = elements.find((el) => el.id.toString() === event.active.id);
      console.log('Dragged element:', draggedElement);
      console.log('Dropped into:', over.id);
      
      if (draggedElement && over.id === 'LS-container') {

        const updatedElements = elements.filter((el) => el.id !== draggedElement.id);
        setElements(updatedElements);
      }
    }
  }, [elements]);

  
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className='simulation-page'>
        <h1>Lewis Structures</h1>
        <div className='simulation-container'>
          <DroppableContainer id='LS-container'>
            {elements
              .filter((element) => element.droppableId === 'LS-container')
              .map((element) => (
                <DraggableElement key={element.id} id={element.id} symbol={element.symbol} />
              ))}
          </DroppableContainer>
          <DroppableContainer id='droppable'>
            {/* Droppable container content */}
          </DroppableContainer>

        </div>
      </div>
    </DndContext>

  );
};




export default withAuthorization(LewisStructure);

