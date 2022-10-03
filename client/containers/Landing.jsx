import React, { useRef } from 'react';
import { Link, redirect } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';

const URL_PARAMS = new URLSearchParams(window.location.search);
const NAME = URL_PARAMS.get('name')
const ID = URL_PARAMS.get('id')
const USERNAME = URL_PARAMS.get('username')
const EMAIL = URL_PARAMS.get('email')

///http://localhost:4000/auth/logout <-------- use this to logout user
const Landing = () => {
  // console.log(NAME, ID, USERNAME, EMAIL)
  const [loggedIn, setLogIn] = useState(false);
  return (
    <div id='landing-container'>
      <Header />
      <div className='gradient-container'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {/* 
      <div class='img-wrapper'>
        <img src='https://stripe.com/img/v3/home/app-illustrations/catawiki.svg' />
      </div> */}
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
        <a href='http://localhost:4000/auth/github'>
          <button>Sign in with GitHub</button>
        </a>
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
