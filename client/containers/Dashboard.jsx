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
      <div id='dashboard-main'>
        <LineChart />
        <TimeSeriesChart />
        <RealTimeChart />
      </div>
    </div>
  );
};

export default Dashboard;


