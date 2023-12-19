import React, { useState } from 'react';
import './LewisStructure.css';
import withAuthorization from './../../Account/withAuthorization';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';

const LewisStructure = () => {
  const [elements, setElements] = useState([
    {
      symbol: 'H',
      valenceElectrons: 1,
      octet: 2,
      droppableId: 'LS-element-container'

    },
    {
      symbol: 'B',
      valenceElectrons: 3,
      octet: 8,
      droppableId: 'LS-element-container'
    },
    {
      symbol: 'C',
      valenceElectrons: 4,
      octet: 8,
      droppableId: 'LS-element-container'

    },
    {
      symbol: 'N',
      valenceElectrons: 5,
      octet: 8,
      droppableId: 'LS-element-container'

    },
    {
      symbol: 'O',
      valenceElectrons: 6,
      octet: 8,
      droppableId: 'LS-element-container'

    },
    {
      symbol: 'F',
      valenceElectrons: 7,
      octet: 8,
      droppableId: 'LS-element-container'

    },
    {
      symbol: 'Cl',
      valenceElectrons: 7,
      octet: 8,
      droppableId: 'LS-element-container'

    },
  ]);
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // Check if the drag has a valid destination
    if (!destination) {
      return;
    }

    // Retrieve the dragged element
    const draggedElement = elements.find((el) => el.id === result.draggableId);

    // Perform actions based on the drag result
    if (source.droppableId === 'LS-element-container' && destination.droppableId === 'droppable') {
      // Logic to handle the drag from LS-element-container to droppable
      const updatedElements = elements.filter((el) => el.id !== draggedElement.id);
      setElements(updatedElements);
    }
  };


  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='simulation-page'>
        <h1>Lewis Structures</h1>
        <div className='simulation-container'>
          <Droppable droppableId="LS-element-container">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='LS-element-container'
              >
                {elements.map((element, index) => (
                  <Draggable key={element.id} draggableId={element.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='LS-element'
                      >
                        <p>{element.symbol}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='LS-container'
              >
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};


export default withAuthorization(LewisStructure);

