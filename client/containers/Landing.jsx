import React, { useRef, useState } from 'react';
import { Link, redirect, useParams } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';

///http://localhost:4000/auth/logout <-------- use this to logout user
const Landing = () => {
  return (
    <div id='landing-container'>
      <Header params={URL_PARAMS}/>
      <div className='gradient-container'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className='copy-container'>
        <h1>
          Keep a keen eye on your
          <br />
          Kafka clusters
        </h1>
        <p>
          {' '}
          Zurau helps engineering teams of all sizes quickly and easily stay up
          to date on the status of their Kafka environments.
        </p>
        <Link to='/dashboard'>
          <button>Try It Out {'>'}</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
