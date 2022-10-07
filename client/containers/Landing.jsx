import React from 'react';
import { Link } from 'react-router-dom';
import UserIcon from '../assets/UserIcon';
import Header from './Header';
import { useNavigate } from "react-router-dom";
///http://localhost:4000/auth/logout <-------- use this to logout user
const Landing = ({ user }) => {
  const navigate = useNavigate();
  if (user.name !== '' || user.name !== null){
    console.log('LANDING USER',user)
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
          Zurau helps engineering teams of all sizes quickly and easily stay up
          to date on the status of their Kafka environments.
        </p>
        <Link to='/h_dashboard'>
          <button>Try It Out {'>'}</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
