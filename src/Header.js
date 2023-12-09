// Header.js
import React from 'react';
import './Header.css';
import logoImage from './logo.png';

const Header = () => {
  return (
    <>
      <img src={logoImage} alt="Logo" className='logo'/>
    </>
  );
};

export default Header;
