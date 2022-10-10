import React from 'react';

import { Link } from 'react-router-dom';

import GraphIcon from '../assets/GraphIcon.jsx';
import CogIcon from '../assets/CogIcon.jsx';
import UserIcon from '../assets/UserIcon.jsx';
import ZurauLogo from '../assets/ZurauLogo.jsx';
import Logout from '../assets/Logout.jsx';

const Sidebar = (props) => {
  const { active, setActive, socketDisconnect } = props;

  const toggleSocket = () => {
    socketDisconnect.current = !socketDisconnect.current;
  };

  return (
    <div id='sidebar-container'>
      <div id='top-sidebar'>
        <Link to='/'>
          <ZurauLogo />
        </Link>
        <div className='spacer' />
        <div id='sidebar-title'>Zurau</div>
      </div>
      <div id='middle-sidebar'>
        <div
          className={
            active == 'health'
              ? 'sidebar-button active-button'
              : 'sidebar-button'
          }
          onClick={() => {
            setActive('health');
            toggleSocket;
          }}
        >
          <div>
            <GraphIcon />
          </div>
          <Link to='/h_dashboard'>Health Metrics</Link>
        </div>

        <div
          className={
            active == 'performance'
              ? 'sidebar-button active-button'
              : 'sidebar-button'
          }
          onClick={() => {
            setActive('performance');
            toggleSocket;
          }}
        >
          <div>
            <GraphIcon />
          </div>
          <Link to='/p_dashboard'>Performance Metrics</Link>
        </div>

        <div
          className={
            active == 'profile'
              ? 'sidebar-button active-button'
              : 'sidebar-button'
          }
          onClick={() => setActive('profile')}
        >
          <div>
            <CogIcon />
          </div>
          <Link to='#'>Notifications</Link>
        </div>

      </div>
      <div id='bottom-sidebar'>
        <div
          className={
            active == 'logout'
              ? 'sidebar-button active-button'
              : 'sidebar-button'
          }
          onClick={toggleSocket}
        >
          <div>
            <Logout />
          </div>
          <Link to='http://localhost:4000/auth/logout'>Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
