import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
// import LineChart from '../components/LineChart';
// import TimeSeriesChart from '../components/TimeSeriesChart';
import RealTimeChart from '../components/RealTimeChart';
import RealTimeChart2 from '../components/RealTimeChart2';
import RealTimeChart3 from '../components/RealTimeChart3';
import StaticMetricDisplay from '../components/StaticMetricDisplay';

import { io } from "socket.io-client";

const socket = io('http://localhost:4000');
socket.emit('rate', {
  "bytesInPerSec": ["kafka_server_broker_topic_metrics_bytesinpersec_rate",""],
  "bytesOutPerSec": ["kafka_server_broker_topic_metrics_bytesoutpersec_rate",""],
  "messagesInPerSec": ["kafka_server_broker_topic_metrics_messagesinpersec_rate",""],
//   "activeControllerCount": ["sum(kafka_controller_activecontrollercount)",""]
  })

const Dashboard = ({ active, setActive }) => {
  // const [categories, setCategories] = useState(''); //title 
  const [bytesIn, setBytesIn] = useState([]);
  const [bytesOut, setBytesOut] = useState([]);
  const [msgsIn, setMsgsIn] = useState([]);
  const [activeControllerCount, setActiveControllerCount] = useState(0);

  useEffect(() => {
    socket.on('rate', (data) => {
      // console.log('logged into the useEffect: socket on')
      // console.log('guess what?', data.bytesInPerSec.value)
      const binSeries = [];
      let binTime = (data.bytesInPerSec.value[0] - 14400) * 1000
      let binBytes = parseInt(data.bytesInPerSec.value[1])
      binSeries.push(binTime, binBytes)
      setBytesIn(currentData => [...currentData, binSeries])

      const boutSeries = [];
      let boutTime = (data.bytesOutPerSec.value[0] - 14400) * 1000
      let boutBytes = parseInt(data.bytesOutPerSec.value[1])
      boutSeries.push(boutTime, boutBytes)
      setBytesOut(currentData => [...currentData, boutSeries])

      const msgInSeries = [];
      let msgInTime = (data.messagesInPerSec.value[0] - 14400) * 1000
      let msgInBytes = parseInt(data.messagesInPerSec.value[1])
      msgInSeries.push(msgInTime, msgInBytes)
      setMsgsIn(currentData => [...currentData, msgInSeries])
    
     })
  }, []);


  return (
    <div id='dashboard-container'>
      <Sidebar active={active} setActive={setActive} />
      <div id='dashboard-charts'>
        <RealTimeChart series={[{name: 'Bytes In/sec', data: bytesIn},{name: 'Bytes Out/sec', data: bytesOut}]} />
        <RealTimeChart2 series={[{data: msgsIn}]}/>
        <RealTimeChart3 />
      </div>
      {/* Create a main component that renders charts or settings, etc. */}
    </div>
  );
};

export default Dashboard;
