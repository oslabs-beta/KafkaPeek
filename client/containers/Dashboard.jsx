import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
// import LineChart from '../components/LineChart';
// import TimeSeriesChart from '../components/TimeSeriesChart';
import RealTimeChart from '../components/RealTimeChart';
import RealTimeChart2 from '../components/RealTimeChart2';
import RealTimeChart3 from '../components/RealTimeChart3';

import { io } from "socket.io-client";

const Dashboard = ({ active, setActive }) => {
  const [categories, setCategories] = useState('');
  const [series, setSeries] = useState([
    [1664032900, '1409.4093697787282'],
    [1664032910, '1268.7402261718873'],
    [1664032920, '1268.7402261718873'],
    [1664032930, '1297.642647483924'],
    [1664032940, '1411.3234368306057'],
    [1664032950, '1411.3234368306057'],
    [1664032960, '1426.0732153397921'],
    [1664032970, '1507.9669777520962'],
    [1664032980, '1507.9669777520962'],
    [1664032990, '1596.05816848304'],
    [1664033000, '1638.589563253154'],
    [1664033010, '1638.589563253154'],
    [1664033020, '1612.1204243292677'],
    [1664033030, '1725.7551932781755'],
    [1664033040, '1725.7551932781755'],
    [1664033050, '1614.9919607385955'],
    [1664033060, '1567.4945847153167'],
    [1664033070, '1567.4945847153167'],
    [1664033080, '1438.0587256444699'],
    [1664033090, '1480.1587390127202'],
    [1664033100, '1480.1587390127202'],
    [1664033110, '1436.8997532907906'],
    [1664033120, '1450.7946776144645'],
    [1664033130, '1450.7946776144645'],
    [1664033140, '1342.9391508753693'],
    [1664033150, '1358.0826965455087'],
    [1664033160, '1358.0826965455087'],
    [1664033170, '1405.81494002911'],
    [1664033180, '1533.8875915213791'],
    [1664033190, '1533.8875915213791'],
  ]);
  
  //socket logic
  
  const socket = io('http://localhost:4000');
  socket.on('connect', () => {
    console.log('connected')
  })
  socket.emit('rate', {
    "bytesInPerSec": ["kafka_server_broker_topic_metrics_bytesinpersec_rate","[5m:5s]"],
    "bytesOutPerSec": ["kafka_server_broker_topic_metrics_bytesoutpersec_rate","[5m:5s]"],
    "messagesInPerSec": ["kafka_server_broker_topic_metrics_messagesinpersec_rate","[5m:5s]"],
    "activeControllerCount": ["sum(kafka_controller_activecontrollercount)",""]
    })
  socket.on("rate", (data) => { 
    //transform that data
    //setCategories + setSeries

    console.log("SOCKET", data)
  })

  const transformedSeries = [];

  series.forEach((values) => {
    let result = [];

    let time = values[0];
    let bytes;

    time = new Date(values[0] * 1000);
    bytes = parseInt(values[1]);

    result.push(time);
    result.push(bytes);

    transformedSeries.push(result);
  });

  return (
    <div id='dashboard-container'>
      <Sidebar active={active} setActive={setActive} />
      <div id='dashboard-charts'>
        <RealTimeChart series={transformedSeries} categories={categories} />
        <RealTimeChart2 />
        <RealTimeChart3 />
      </div>
      {/* Create a main component that renders charts or settings, etc. */}
    </div>
  );
};

export default Dashboard;
