import React from 'react';
import HeroImg from './tractor_no_bg.png';
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div>
      {/* <!-- Hero Section --> */}
      <div className="hero">
        {/* <!-- Left Text --> */}
        <div className="leftSideHero">
          <div className="mainText">
            <h1>EMPOWER</h1>
            <h2>YOUR FARM WITH</h2>
            <h1 id="agro_text">AGRO ACE</h1>
          </div>
          <div className="captionText">
            <h3>
              Pakistan's 1st All in One Agricultural Land <br /> Management System by Ryan, Imama and Arsalan
            </h3>
          </div>
          <div className="GetStartedButton">
            <button>
              <Link to="/Login"> Get Started </Link>
              <i className="fa-solid fa-circle-right"></i>
            </button>
          </div>
        </div>

        <div className="rightSideHero">
          <img src={HeroImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
