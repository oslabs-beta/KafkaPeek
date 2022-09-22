import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
    <div id="sidebar-container">
      <div id="top-sidebar">
        {/* logo and name */}
      </div>
      <div id="middle-sidebar">
        <div className="sidebar-button">
          <span>Icon</span>
          <Link to='/dashboard'>Dashboard</Link>
        </div>
        <div className="sidebar-button">
          <span>Icon</span>
          <Link to='#'>Profile</Link>
        </div>
        <div className="sidebar-button">
          <span>Icon</span>
          <Link to='#'>Settings</Link>
        </div>        
      </div>
      <div id="bottom-sidebar"/>
    </div>
  );
}

export default Sidebar;
