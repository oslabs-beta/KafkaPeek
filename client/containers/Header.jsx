import React from 'react';
import { Link } from 'react-router-dom';
import ZurauLogo from '../assets/ZurauLogo';

const Header = () => {
  // const [loggedIn, setLogIn] = useState(false);
  const loggedIn = true;
  const signinButton = <button><Link to='/signin'>Sign in {'>'}</Link></button>;
  const dashboardButton = <button><Link to='/dashboard'>Go To Dashboard {'>'}</Link></button>;
  return (
    <div id='header-container'>
      <div id='header-left'>
        <ZurauLogo  />
        <Link to='/'>Zurau</Link>
      </div>
      <div id='header-mid'>
        <div id='header-mid-left'>
          <a href='' target='_blank'>Documentation</a>
        </div>
        <div id='header-mid-right'>
          <a href='https://github.com/oslabs-beta/zurau' target='_blank'>Github</a>
        </div>
      </div>
      <div id='header-right'>
        {
          !loggedIn ? signinButton : dashboardButton
        }
      </div>
    </div>
  );
};

export default Header;
