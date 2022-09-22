import React from 'react';
import Header from '../containers/Header';
import Sidebar from '../containers/Sidebar';
import LineChart from './LineChart';
import TimeSeriesChart from './TimeSeriesChart';
import RealTimeChart from './RealTimeChart';

const Dashboard = () => {
  return (
    <div id='dashboard-container'>

      <div id='dashboard-main'>
        <LineChart />
        <TimeSeriesChart />
        <RealTimeChart />
      </div>
    </div>
  );
};

export default Dashboard;


