import React from 'react';
import molecule from './../img/molecule.gif';
import scientist from './../img/scientist.png';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <img src={molecule} alt="Molecule" />
      <div className="home-title">
        <div className="home-title-blurb">
          <h1>Engage with science like never before</h1>
          <p>
            At ChemEd, we believe in learning through exploration. Our mission
            is to empower students to discover the wonders of chemistry through
            interactive simulations.
          </p>
          <p>Unleash your curiosity, experiment freely, and learn by doing!</p>
        </div>
      </div>
      <h2>Why Explore ChemEd Simulations?</h2>
      <ul>
        <li>
          <b>Engaging Experiments: </b> Dive into a diverse range of
          simulations covering various scientific principles, from fundamental
          concepts to advanced theories.
        </li>
        <li>
          <b>Interactive Learning:</b> Experience science firsthand through
          interactive experiments and simulations that foster deeper
          understanding.
        </li>
        <li>
          <b>Empower Educators: </b>Equip teachers with effective tools to
          enhance classroom lessons, enabling them to inspire and captivate
          students' interest in science.
        </li>
      </ul>
      <img className="home-btm-img" src={scientist} alt="Scientist" />
    </div>
  );
};

export default Home;
