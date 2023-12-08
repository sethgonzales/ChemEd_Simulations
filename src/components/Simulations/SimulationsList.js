import React from 'react';
import { Link } from 'react-router-dom';
import './SimulationsList.css';

const SimulationList = () => {
  const simulations = [
    { name: 'States of Matter', path: 'states-of-matter' },
    { name: 'Chemical Reactions', path: 'chemical-reactions' },
  ];

  return (
    <div className="simulation-list">
      <div>
        <h1>Chemistry Simulations</h1>
      </div>
      <ul>
        {simulations.map((simulation, index) => (
          <li key={index}>
            <Link to={`/${simulation.path}`} className="simulation-link">
              {simulation.name}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default SimulationList;
