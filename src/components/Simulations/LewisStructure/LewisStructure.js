import React from 'react';
import './LewisStructure.css';
import withAuthorization from './../../Account/withAuthorization';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragDrop from './DragDrop';

const LewisStructure = () => {

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <DragDrop />
      </div>
    </DndProvider>
  )
};




export default withAuthorization(LewisStructure);

