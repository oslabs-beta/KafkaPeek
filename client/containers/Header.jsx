import React from 'react';
import { Link } from 'react-router-dom';
import ZurauLogo from '../assets/ZurauLogo';

const Header = ({ user }) => {
  const { name, id, username, email } = user;
  console.log('HEADER', user);

  const signinButton = (
    <button>
      <a href='http://localhost:4000/auth/github'>Sign In With Github {'>'}</a>
    </button>
  );

  const dashboardButton = (
    <button>
      <Link to='/dashboard'>Go To Dashboard {'>'}</Link>
    </button>
  );

  return (
    <div id='header-container'>
      <div id='header-left'>
        <ZurauLogo />
        <Link to='/'>Zurau</Link>
      </div>
      <div id='header-mid'>
        <div id='header-mid-left'>
          <a href='' target='_blank'>
            Documentation
          </a>
        </div>
        <div id='header-mid-right'>
          <a href='https://github.com/oslabs-beta/zurau' target='_blank'>
            Github
          </a>
        </div>
      </div>
      <div id='header-right'>{name == '' || name == null ? signinButton : dashboardButton}</div>
    </div>
  );
};

export default Header;
