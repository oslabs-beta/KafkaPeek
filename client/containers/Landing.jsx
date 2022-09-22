import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';


const Landing = () => {
  return (
    <div id='landing-container'>
      <Header />
      <div id='landing-main'>
        <div id='landing-welcome'>
          <h1>ZURAU</h1>
          <h4>The most useful kafka companion app on the web</h4>
          <div id='log-button'>
            <Link to="/login">
              <button type='submit' className='button'>Sign up or Log in!</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
