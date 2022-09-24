import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div id='header-container'>
      <div id='link-container-1'>
        <Link to='/'>Landing</Link>
      </div>
      <div id='link-container-2'>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
};

export default Header;

