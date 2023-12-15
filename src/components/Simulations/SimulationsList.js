import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './SimulationsList.css';
import statesimg from './../img/statesimg.png';
import comingsoon from './../img/comingsoon.png';

const SimulationList = () => {
  const simulations = [
    {
      name: 'States of Matter',
      path: 'states-of-matter',
      image: statesimg
    },
    {
      name: 'Chemical Reactions',
      path: 'chemical-reactions',
      image: comingsoon
    },
    {
      name: 'Chemical Reactions',
      path: 'chemical-reactions',
      image: comingsoon
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    carouselRef.current.style.transform = `translateX(-${index * 100}%)`;
  };

  return (
    <div className="simulation-list">
      <div>
        <h1>Chemistry Simulations</h1>
      </div>
      <div className="carousel">
        <div className="carousel-track" ref={carouselRef}>
          {simulations.map((simulation, index) => (
            <div key={index} className="carousel-slide">
              <Link to={`/${simulation.path}`} className="simulation-link">
                <img
                  src={simulation.image}
                  alt={simulation.name}
                  className="simulation-image"
                />
              </Link>
            </div>
          ))}
        </div>
        <button className="carousel-prev" onClick={() => goToSlide((currentSlide - 1 + simulations.length) % simulations.length)}>
          &lt;
        </button>
        <button className="carousel-next" onClick={() => goToSlide((currentSlide + 1) % simulations.length)}>
          &gt;
        </button>
      </div>
    </div>
  );
};


export default SimulationList;
