import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import Perf_ReqTotalTime from '../components/Perf_ReqTotalTime';
// import RealTimeChart2 from '../components/RealTimeChart2';
// import RealTimeChart3 from '../components/RealTimeChart3';
// import StaticMetricDisplay from '../components/StaticMetricDisplay';

import { io } from 'socket.io-client';

const socket = io('http://localhost:4000', {
  autoConnect: false
});

const emitFunc = () => {
  socket.emit('performance', {
    // 'requestsPerSec': ['kafka_network_request_per_sec','[10m:10s]'],
    'requestTotalTime':['kafka_network_request_metrics_time_ms{instance="jmx-kafka:5556", request="FetchConsumer",scope="Total",env="cluster-demo"}','[10m:10s]'],
    // 'responseQueueTime': ['kafka_network_request_metrics_time_ms{instance="jmx-kafka:5556", request="FetchConsumer",scope="ResponseQueue",env="cluster-demo", aggregate="99thPercentile"}','[10m:10s]'],
    // 'responseSendTime': ['kafka_network_request_metrics_time_ms{instance="jmx-kafka:5556", request="FetchConsumer",scope="ResponseSend",env="cluster-demo", aggregate="Mean"}','[10m:10s]'],
    // 'processorIdlePercent': ['kafka_network_processor_idle_percent','[10m:10s]']
  })
}

const stopFunc = () => {
  socket.emit('stop');
}

const Dashboard = ({ active, setActive }) => {
  let startMetric = useRef(false);
  let socketDisconnect = useRef(false);
  const [buttonText, setButtonText] = useState('Get Metrics');
  //Dynamic Metrics
  const [reqTotalTime, setreqTotalTime] = useState([]);
  // const [bytesOut, setBytesOut] = useState([]);
  // const [msgsIn, setMsgsIn] = useState([]);
  // const [jvmUsage, setJvmUsage] = useState([]);
  //Static Metrics
  // const [activeControllerCount, setActiveControllerCount] = useState(0);
  // const [offlinePartitions, setOfflinePartitions] = useState(0);
  // const [underReplicatedPartitions, setUnderReplicatedPartitions] = useState(0);
  // const [brokersRunning, setBrokersRunning] = useState(0);

  const handleClick = () => {
    if(!startMetric.current) {
      socket.connect()
      emitFunc();
      setButtonText('Pause')
      startMetric.current = !startMetric.current;
    } else {
      stopFunc();
      setButtonText('Get Metrics')
      startMetric.current = !startMetric.current;
    }
  }

  useEffect(() => {
    if(!socketDisconnect.current) {
      stopFunc()
      socket.disconnect();
      socketDisconnect.current = !socketDisconnect.current
    }
  },[socketDisconnect.current]);

  

  useEffect(() => {
    socket.on('performance', (data) => {
      setreqTotalTime(currentData => [...currentData, ...data.reqTotalTimePerSec])
      // setBytesOut(currentData => [...currentData, ...data.bytesOutPerSec]);
      // setMsgsIn(currentData => [...currentData, ...data.messagesInPerSec]);
      // setJvmUsage(currentData => [...currentData, ...data.jvmHeapUsage]);  
      // setActiveControllerCount(data.activeControllerCount);
      // setOfflinePartitions(data.offlinePartitions);
      // setUnderReplicatedPartitions(data.underRepPartitions);
      // setBrokersRunning(data.brokersRunning);
     }) 
  }, []);

     
          


 
  return (
    <div id='dashboard-container'>
      <Sidebar active={active} setActive={setActive} socketDisconnect={socketDisconnect}/>
      <div id='dashboard-charts'>
      <button onClick={handleClick}>
        {buttonText}
      </button>
        {/* <StaticMetricDisplay metric={activeControllerCount} title={'Active Controller Count'} container={1}/>
        <StaticMetricDisplay metric={offlinePartitions} title={'Offline Partitions'} container={2}/>
        <StaticMetricDisplay metric={underReplicatedPartitions} title={'Under Replicated Partitions'} container={3} />
        <StaticMetricDisplay metric={brokersRunning} title={'Brokers Running'} container={4}/>
        <RealTimeChart series={[{name: 'Bytes In Per Sec', data: reqTotalTime},{name: 'Bytes Out Per Sec', data: bytesOut}]} />
        <RealTimeChart2 series={[{name: 'Messages In Per Second', data: msgsIn}]}/>
        <RealTimeChart3 series={[{name: 'JVM Heap Usage', data: jvmUsage}]}/> */}
        <Perf_ReqTotalTime series={[{name: 'Mean', data: reqTotalTime}]} />
        {/* /*, {name: '99th Percentile', data: reqTotalTime}, {name: '75th Percentile', data: reqTotalTime}*/ */}

      </div>
      {/* Create a main component that renders charts or settings, etc. */}
    </div>
  );
};

export default Dashboard;
