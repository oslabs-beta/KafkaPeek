import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  const { active, setActive } = props;
  return (
    <div id='sidebar-container'>
      <div id='top-sidebar'>{/* logo and name */}</div>
      <div id='middle-sidebar'>
        <div className={active == 'charts' ? 'sidebar-button active-button' : 'sidebar-button'} onClick={() => setActive('charts')}>
          <span>Icon</span>
          <Link to='/dashboard'>Dashboard</Link>
        </div>
        <div className={active == 'profile' ? 'sidebar-button active-button' : 'sidebar-button'} onClick={() => setActive('profile')}>
          <span>Icon</span>
          <Link to='#'>Profile</Link>
        </div>
        <div className={active == 'settings' ? 'sidebar-button active-button' : 'sidebar-button'} onClick={() => setActive('settings')}>
          <span>Icon</span>
          <Link to='#'>Settings</Link>
        </div>
      </div>
      <div id='bottom-sidebar' />
    </div>
  );
};

export default Sidebar;
