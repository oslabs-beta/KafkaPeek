import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';

const Landing = () => {
  return (
    <div id='landing-container'>
      <Header />
      <div class='gradient-container'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {/* 
      <div class='img-wrapper'>
        <img src='https://stripe.com/img/v3/home/app-illustrations/catawiki.svg' />
      </div> */}
      <div class='copy-container'>
        <h1>
          Keep a keen eye on your<br />
          Kafka clusters
        </h1>
        <p>
          {' '}
          Zurau helps engineering teams of all sizes quickly and easily stay up
          to date on the status of their Kafka environments.
        </p>
        <button>
          <Link to='/dashboard' element={<Dashboard />}>
            Try it now {'>'}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Landing;

{
  /* <Header />
      <div id='landing-main'>
        <div id='landing-welcome'>
          <h1>Zurau</h1>
          <h4>The most useful kafka companion app on the web</h4>
          <div id='log-button'>
            <Link to="/login">
              <button type='submit' className='button'>Sign up or Log in!</button>
            </Link>
          </div>
        </div>
      </div> */
}
