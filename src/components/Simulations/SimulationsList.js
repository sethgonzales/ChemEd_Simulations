import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, db } from "./../../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import './SimulationsList.css';
import statesimg from './../img/statesimg.png';
import comingsoon from './../img/comingsoon.png';
import withAuthorization from './../Account/withAuthorization';

const SimulationList = ({ userAuth }) => {
  const simulations = [
    {
      name: 'States of Matter',
      path: 'states-of-matter',
      image: statesimg,
      description: 'Model differences between solids, liquids, and gases'
    },
    {
      name: 'Balancing Reactions',
      path: 'balancing-reactions',
      image: comingsoon,
      description: 'Use a scale to balance chemical reactions and see the impact of changing coefficients'

    },
    {
      name: 'Titrations',
      path: 'titrations',
      image: comingsoon,
      description: 'Learn how to use a buret and perform a colorimetric titration'
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
    </div>

  );
};

export default withAuthorization(SimulationList); 
