import React from 'react';
import { Link } from 'react-router-dom';
import GraphIcon from '../assets/GraphIcon.jsx';
import CogIcon from '../assets/CogIcon.jsx';
import UserIcon from '../assets/UserIcon.jsx';
import ZurauLogo from '../assets/ZurauLogo.jsx';
import HomeIcon from '../assets/HomeIcon.jsx'
import Logout from '../assets/Logout.jsx'

const Sidebar = (props) => {
  const { active, setActive, socketDisconnect } = props;

  const handleClickHome = () => {
    socketDisconnect.current = !socketDisconnect.current
  }

  return (
    <div id='sidebar-container'>
      <div id='top-sidebar'>
        <ZurauLogo />
        <div className="spacer"/>
        <div id="sidebar-title">Zurau</div> 
      </div>
      <div id='middle-sidebar'>
        {/* <div onClick={handleClickHome}>
        <Link to='/'>Home</Link>
        </div> */}

        <div
          className={
            active == 'home'
              ? 'sidebar-button active-button'
              : 'sidebar-button'
          }
          onClick={handleClickHome}
        >
          <div>
            <HomeIcon />
          </div>
            <Link to='/'>Home</Link>
        </div>

        <div
          className={
            active == 'charts'
              ? 'sidebar-button active-button'
              : 'sidebar-button'
          }
          onClick={() => setActive('charts')}
        >
          
          <div>
            <GraphIcon />
          </div>
          <Link to='/h_dashboard'>Analytics</Link>
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
            <UserIcon />
          </div>
          <Link to='#'>Account</Link>
          </div>
        <div
          className={
            active == 'settings'
              ? 'sidebar-button active-button'
              : 'sidebar-button'
          }
          onClick={() => setActive('settings')}
        >
          <div>
            <CogIcon />
          </div>
          <Link to='#'>Settings</Link>
        </div>
      </div>
      <div id='bottom-sidebar'>
        <div
            className={
              active == 'home'
                ? 'sidebar-button active-button'
                : 'sidebar-button'
            }
            onClick={handleClickHome}
          >
      
              <a id='bottom-logout' href='http://localhost:4000/auth/logout'>
                <div>
                  <Logout />
                </div>
                <div>
                  Logout
                </div>
              </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
