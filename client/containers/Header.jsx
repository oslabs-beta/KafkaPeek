import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div id='header-container'>
      <div id='link-container-1'>
        <Link to='/'>Landing</Link>
      </div>
      <div id='link-container-2'>
        <Link to='/home'>Home</Link>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
};

export default Header;

//add a logo and have it connected to landing link
//create buttons to wrap links in link-container-2
