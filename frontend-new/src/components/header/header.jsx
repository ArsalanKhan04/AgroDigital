import React, { useState } from 'react';
import Logo from './logo_png.png';
import './Header.css';
import { Link } from 'react-router-dom';
import SignUpForm from '../pages/signup/signup';

const Header = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignInClick = () => {
    setShowSignUp(true);
  };

  return (
    <div>
      <div className="header">
        {/* Logo */}
        <div className="logo">
          <img id="logo" src={Logo} alt="Logo" />
        </div>
        {/* Other Links */}
        <nav>
          <ul>
            <a href="">Home</a>
            <a href="">Features</a>
            <a href="">Pricing</a>
            <a href="">About Us</a>
            <a href="">Contact Us</a>
          </ul>
        </nav>
        {/* Sign In Button */}
        <div className="signInButton">
          <button onClick={handleSignInClick}>Sign In</button>
        </div>
      </div>

      {/* Render SignUpForm if showSignUp is true */}
      {showSignUp && <SignUpForm/>}
    </div>
  );
};

export default Header;
