import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

const Landing = ({ user }) => {
  const navigate = useNavigate();

  if (user.name !== '' || user.name !== null) {
    window.history.replaceState({}, document.title, "/" + `${user.login}`);
    navigate("/h_dashboard");
  }

  return (
    <div id='landing-container'>
      <Header user={user} />
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
          KafkaPeek helps engineering teams of all sizes quickly and easily stay up
          to date on the status of deployments
        </p>
        <Link to='/h_dashboard'>
          <button>Try It Out {'>'}</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
