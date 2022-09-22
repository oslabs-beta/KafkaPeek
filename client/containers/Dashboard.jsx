import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import LineChart from '../components/LineChart';
import TimeSeriesChart from '../components/TimeSeriesChart';
import RealTimeChart from '../components/RealTimeChart';

const Dashboard = () => {
  return (
    <div id='dashboard-container'>
      <Header />
      <Sidebar />
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


