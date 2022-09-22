import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div id='header-container'>
      <div id='header-left'>
        <Link to='/'>Landing</Link>
      </div>
      <div id='header-right'>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
};

export default Header;

