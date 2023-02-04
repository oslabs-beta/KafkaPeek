import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GraphIcon from '../assets/GraphIcon.jsx';
import CogIcon from '../assets/CogIcon.jsx';
import UserIcon from '../assets/UserIcon.jsx';
import KafkaPeekLogo from '../assets/KafkaPeekLogo.jsx';
import Logout from '../assets/Logout.jsx';

const Sidebar = ({active, setActive, handleHealthDisconnect, handlePerfDisconnect}) => {

  const handleAllDisconnect = () => {
    if(active === 'health') {
      handleHealthDisconnect()
    }
    if(active === 'performance') {
      handlePerfDisconnect();
    }
  }

  return (
    <div id='sidebar-container'>
      <div id='top-sidebar'>
        <Link to='/' onClick={handleAllDisconnect}>
          <KafkaPeekLogo />
        </Link>
        <div className='spacer' />
        <div id='sidebar-title'>KafkaPeek</div>
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
          }}
        >
          <div>
            <GraphIcon />
          </div>
          <Link to='/h_dashboard' onClick={handlePerfDisconnect}>
            Health Metrics
          </Link>
        </div>

        <div
          className={
            active == 'performance'
              ? 'sidebar-button active-button'
              : 'sidebar-button'
          }
          onClick={() => {
            setActive('performance');
          }}
        >
          <div>
            <GraphIcon />
          </div>
          <Link to='/p_dashboard' onClick={handleHealthDisconnect}>
            Performance Metrics
          </Link>
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
          <Link to='/notifications' onClick={handleAllDisconnect}>
            Settings
          </Link>
        </div>
      </div>
      <div id='bottom-sidebar'>
        <div
          className={
            active == 'logout'
              ? 'sidebar-button active-button'
              : 'sidebar-button'
          }
        >
          <div>
            <Logout />
          </div>
          <a
            href='http://localhost:4000/auth/logout'
            onClick={handleAllDisconnect}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
