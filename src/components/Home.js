import React from 'react';
import molecule from './../img/molecule.gif';
import erlenmyer from './../img/erlenmyer.png';
import scientist from './../img/scientist.png';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className='home-info'>
        <div className="home-blurb">
          <h1>Engage with science like never before</h1>
          <p>
            At ChemEd, we believe in learning through exploration.
          </p>
          <p>
            Our goal is to empower students to discover the wonders of chemistry through
            interactive simulations.
          </p>
          <p>Unleash your curiosity, experiment freely, and learn by doing!</p>
        </div>
        <img src={molecule} className='home-top-left ' alt="Molecule" />
        <img className="home-top-right" src={erlenmyer} alt="Erlenmyer flask" />
        <div className='home-mission'>
          <h1>What we are about</h1>
          <ul>
            <li>
              <b>Engaging Experiments: </b> Dive into a range of
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
          <img src={scientist} className='home-btm-img ' alt="scientist" />
        </div>
      </div>
    </div>
  );
};

export default Home;
