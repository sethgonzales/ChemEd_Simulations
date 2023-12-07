import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ userAuth }) => {
  return (
    <div className="home">
      <div className="text">
        <h1>Simulations for your K-12 Classroom</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus placerat, quam sed finibus convallis, quam
          odio convallis sapien.
        </p>
        {userAuth && <Link to="/account">View Account</Link>}
      </div>
    </div>
  );
};

export default Home;
