import React from "react";
import { Link } from 'react-router-dom';
import statesimg from './../../img/statesimg.png';
import comingsoon from './../../img/comingsoon.png';
import lewis_struct from './../../img/lewis_struct.png';
import atom from './../../img/atom.png';
import withAuthorization from './../Account/withAuthorization';
import './SimulationsList.css';

const SimulationList = () => {
  const simulations = [
    {
      name: 'States of Matter',
      path: 'states-of-matter',
      image: statesimg,
      description: 'Model differences between solids, liquids, and gases'
    },
    {
      name: 'Lewis Structures',
      path: 'lewis-structures',
      image: lewis_struct,
      description: 'Build Lewis Structures with drag and drop elements and bonds!'

    },
    {
      name: 'Balancing Reactions',
      path: 'balancing-reactions',
      image: comingsoon,
      description: 'Use a scale to balance chemical reactions and see the impact of changing coefficients'
    },
  ];

  return (
    <div className="simulation-list">
      <h1>Chemistry Simulations</h1>
      <div className="projects-container">
        {simulations.map((simulation, index) => (
          <Link to={`/${simulation.path}`} key={index} className="project-container">
            <div className="simulation-link">
              <h2>{simulation.name}</h2>
              <img src={simulation.image} alt={simulation.name} />
              <p>{simulation.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <img className="sim-list-img" src={atom} alt="Atom" />

    </div>

  );
};

export default withAuthorization(SimulationList); 
