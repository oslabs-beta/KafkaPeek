import React, { useState } from 'react';
import Sidebar from './Sidebar';
// import LineChart from '../components/LineChart';
// import TimeSeriesChart from '../components/TimeSeriesChart';
import RealTimeChart from '../components/RealTimeChart';
import RealTimeChart2 from '../components/RealTimeChart2';
import RealTimeChart3 from '../components/RealTimeChart3';

const Dashboard = ({active, setActive}) => {
  return (
    <div id='dashboard-container'>
      <Sidebar active={active} setActive={setActive} />
      <div id='dashboard-charts'>
        <RealTimeChart />
        <RealTimeChart2 />
        <RealTimeChart3 />
      </div>
      {/* Create a main component that renders charts or settings, etc. */}
    </div>
  );
};

export default Dashboard;


