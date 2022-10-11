import React, { useState, useEffect, useRef } from 'react';

import { io } from "socket.io-client";

import Sidebar from './Sidebar';
import HealthBinBout from '../components/HealthBinBout';
import HealthJVM from '../components/HealthJVM';
import HealthMsgIn from '../components/HealthMsgIn';
import StaticMetricDisplay from '../components/StaticMetricDisplay';

const socket = io('http://localhost:4000', {
  autoConnect: false
});

export const params = {
  'bytesInPerSec': ['kafka_server_broker_topic_metrics_bytesinpersec_rate', '[10m:10s]'],
  'bytesOutPerSec': ['kafka_server_broker_topic_metrics_bytesoutpersec_rate', '[10m:10s]'],
  'messagesInPerSec': ['kafka_server_broker_topic_metrics_messagesinpersec_rate', '[10m:10s]'],
  'jvmHeapUsage': ['kafka_jvm_heap_usage{env="cluster-demo", type="used"}', '[10m:10s]'],
  'activeControllerCount': ["sum(kafka_controller_activecontrollercount)", ""],
  'underRepPartitions': ['kafka_server_replica_manager_underreplicatedpartitions', ''],
  'offlinePartitions': ['kafka_controller_offlinepartitionscount', ''],
  'brokersRunning': ['count(kafka_server_brokerstate)', '']
}

const emitFunc = () => {
  socket.emit('health', params)
}

const stopFunc = () => {
  socket.emit('stop');
}

const HealthDashboard = ({ active, setActive }) => {
  let startMetric = useRef(false);
  let socketDisconnect = useRef(false);
  const [buttonText, setButtonText] = useState('Get Metrics');
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

  const handleClick = () => {
    if (!startMetric.current) {
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
    if (!socketDisconnect.current) {
      stopFunc()
      socket.disconnect();
      socketDisconnect.current = !socketDisconnect.current
    }
  }, [socketDisconnect.current]);

  useEffect(() => {
    socket.on('health', (data) => {
      setBytesIn(currentData => [...currentData, ...data.bytesInPerSec])
      setBytesOut(currentData => [...currentData, ...data.bytesOutPerSec]);
      setMsgsIn(currentData => [...currentData, ...data.messagesInPerSec]);
      setJvmUsage(currentData => [...currentData, ...data.jvmHeapUsage]);
      setActiveControllerCount(data.activeControllerCount);
      setOfflinePartitions(data.offlinePartitions);
      setUnderReplicatedPartitions(data.underRepPartitions);
      setBrokersRunning(data.brokersRunning);
    })
  }, []);

  return (
    <div id='dashboard-container'>
      <Sidebar active={active} setActive={setActive} socketDisconnect={socketDisconnect} />
      <div id='dashboard-charts'>
        <button onClick={handleClick}>
          {buttonText}
        </button>
        <StaticMetricDisplay metric={activeControllerCount} title={"Active Controller Count"} container={1} />
        <StaticMetricDisplay metric={offlinePartitions} title={"Offline Partitions"} container={2} />
        <StaticMetricDisplay metric={underReplicatedPartitions} title={"Under Replicated Partitions"} container={3} />
        <StaticMetricDisplay metric={brokersRunning} title={"Brokers Running"} container={4} />
        <HealthBinBout series={[{ name: 'Bytes In Per Sec', data: bytesIn }, { name: 'Bytes Out Per Sec', data: bytesOut }]} />
        <HealthMsgIn series={[{ name: 'Messages In Per Second', data: msgsIn }]} />
        <HealthJVM series={[{ name: 'JVM Heap Usage', data: jvmUsage }]} />
      </div>
    </div>
  );
};

export default HealthDashboard;
