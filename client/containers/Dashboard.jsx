import React, { useState } from 'react';
import Sidebar from './Sidebar';
import LineChart from '../components/LineChart';
import TimeSeriesChart from '../components/TimeSeriesChart';
import RealTimeChart from '../components/RealTimeChart';

const Dashboard = ({active, setActive}) => {
  return (
    <div id='dashboard-container'>
      <Sidebar active={active} setActive={setActive} />
      <div id='dashboard-charts'>
        <LineChart />
        <TimeSeriesChart />
        <RealTimeChart />
      </div>
      {/* Create a main component that renders charts or settings, etc. */}
    </div>
  );
};

export default Dashboard;


