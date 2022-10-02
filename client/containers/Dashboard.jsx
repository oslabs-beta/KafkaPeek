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

const emitFunc = () => {
  socket.emit('rate', {
    'bytesInPerSec': ['kafka_server_broker_topic_metrics_bytesinpersec_rate','[10m:10s]'],
    'bytesOutPerSec': ['kafka_server_broker_topic_metrics_bytesoutpersec_rate','[10m:10s]'],
    'messagesInPerSec': ['kafka_server_broker_topic_metrics_messagesinpersec_rate','[10m:10s]'],
    'jvmHeapUsage': ['kafka_jvm_heap_usage{env="cluster-demo", type="used"}','[10m:10s]'],
    // 'activeControllerCount': ["sum(kafka_controller_activecontrollercount)",""],
    // 'underRepPartitions': ['kafka_server_replica_manager_underreplicatedpartitions',''],
    // 'offlinePartitions': ['kafka_controller_offlinepartitionscount',''],
    // 'brokersRunning': ['count(kafka_server_brokerstate)','']
  })
}
setTimeout(emitFunc, 4000)

const Dashboard = ({ active, setActive }) => {
  //Dynamic Metrics
  const [bytesIn, setBytesIn] = useState([]);
  const [bytesOut, setBytesOut] = useState([]);
  const [msgsIn, setMsgsIn] = useState([]);
  const [jvmUsage, setJvmUsage] = useState([]);
  //Static Metrics
  const [activeControllerCount, setActiveControllerCount] = useState(0);
  const [offlinePartitions, setOfflinePartitions] = useState(0);
  const [underReplicatedPartitions, setUnderReplicatedPartitions] = useState(0);
  const [brokersRunning, setBrokersRunning] = useState(0);

  useEffect(() => {
    socket.on('rate', (data) => {

      setBytesIn(currentData => [...currentData, ...data.bytesInPerSec])
      setBytesOut(currentData => [...currentData, ...data.bytesOutPerSec]);
      setMsgsIn(currentData => [...currentData, ...data.messagesInPerSec]);
      setJvmUsage(currentData => [...currentData, ...data.jvmHeapUsage]);  

      // const activeControllerCount = parseInt(data.activeControllerCount.value[1]);
      // setActiveControllerCount(activeControllerCount)

      // const newInitialPartition = parseInt(data.offlinePartitions.value[1]);
      // if (newInitialPartition !== offlinePartitions) setOfflinePartitions(newInitialPartition);
 
      // const newUnderRep = parseInt(data.underRepPartitions.value[1]);
      // if (newUnderRep !== underReplicatedPartitions) setUnderReplicatedPartitions(newUnderRep);

      // const brokersRunning = parseInt(data.brokersRunning.value[1]);
      // setBrokersRunning(brokersRunning)

     }) 
  }, []);

     
          


 
  return (
    <div id='dashboard-container'>
      <Sidebar active={active} setActive={setActive} />
      <div id='dashboard-charts'>
        <StaticMetricDisplay metric={activeControllerCount} title={"Active Controller Count"} container={1}/>
        <StaticMetricDisplay metric={offlinePartitions} title={"Offline Partitions"} container={2}/>
        <StaticMetricDisplay metric={underReplicatedPartitions} title={"Under Replicated Partitions"} container={3} />
        <StaticMetricDisplay metric={brokersRunning} title={"Brokers Running"} container={4}/>
        <RealTimeChart series={[{name: 'Bytes In Per Sec', data: bytesIn},{name: 'Bytes Out Per Sec', data: bytesOut}]} />
        <RealTimeChart2 series={[{name: 'Messages In Per Second', data: msgsIn}]}/>
        <RealTimeChart3 series={[{name: 'JVM Heap Usage', data: jvmUsage}]}/>
      </div>
      {/* Create a main component that renders charts or settings, etc. */}
    </div>
  );
};

export default Dashboard;
