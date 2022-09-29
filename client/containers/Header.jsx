import React from 'react';
import { Link } from 'react-router-dom';
import ZurauLogo from '../assets/ZurauLogo';

const Header = () => {
  return (
    <div id='header-container'>
      <div id='header-left'>
        <ZurauLogo  />
        <Link to='/'>Zurau</Link>
      </div>
      <div id='header-mid'>
        <div id='header-mid-left'>
          <a href=''>Documentation</a>
        </div>
        <div id='header-mid-right'>
          <a href=''>Github</a>
        </div>
      </div>
      <div id='header-right'>
        <button>
          <Link to='/signin'>Sign in {'>'}</Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
