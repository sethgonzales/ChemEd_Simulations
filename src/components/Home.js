import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home-title">
        <h1>Simulations for your Science Classroom</h1>
        <p>
          Engage with science like never before
        </p>
      </div>
      <h2>Why Explore ChemEd Simulations?</h2>
      <ul>
        <li><b>Engaging Experiments: </b> Dive into a diverse range of simulations covering various scientific principles, from fundamental concepts to advanced theories.</li>
        <li><b>Interactive Learning:</b> Experience science firsthand through interactive experiments and simulations that foster deeper understanding.</li>
        <li><b>Empower Educators: </b>Equip teachers with effective tools to enhance classroom lessons, enabling them to inspire and captivate students' interest in science.</li>
      </ul>
    </div>
  );
};

export default Home;
