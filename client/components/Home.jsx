import React from 'react';
import Header from '../containers/Header';
import Sidebar from '../containers/Sidebar';
import LineChart from './LineChart';
import TimeSeriesChart from './TimeSeriesChart';
import RealTimeChart from './RealTimeChart';

const Home = () => {
  return (
    <div id='home-container'>
      <Header />
      <Sidebar />
      <div id='home-main'>
        <LineChart />
        <TimeSeriesChart />
        <RealTimeChart />
      </div>
    </div>
  );
};

export default Home;
