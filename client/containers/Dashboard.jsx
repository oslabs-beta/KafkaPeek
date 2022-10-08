import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import RealTimeChart from '../components/RealTimeChart';
import RealTimeChart2 from '../components/RealTimeChart2';
import RealTimeChart3 from '../components/RealTimeChart3';
import StaticMetricDisplay from '../components/StaticMetricDisplay';
import { io } from "socket.io-client";
  

const socket = io('http://localhost:4000', {
  autoConnect: false
});

const emitFunc = () => {
  socket.emit('health', {
    'bytesInPerSec': ['kafka_server_broker_topic_metrics_bytesinpersec_rate','[10m:10s]'],
    'bytesOutPerSec': ['kafka_server_broker_topic_metrics_bytesoutpersec_rate','[10m:10s]'],
    'messagesInPerSec': ['kafka_server_broker_topic_metrics_messagesinpersec_rate','[10m:10s]'],
    'jvmHeapUsage': ['kafka_jvm_heap_usage{env="cluster-demo", type="used"}','[10m:10s]'],
    'activeControllerCount': ["sum(kafka_controller_activecontrollercount)",""],
    'underRepPartitions': ['kafka_server_replica_manager_underreplicatedpartitions',''],
    'offlinePartitions': ['kafka_controller_offlinepartitionscount',''],
    'brokersRunning': ['count(kafka_server_brokerstate)','']
  })
}

const stopFunc = () => {
  socket.emit('stop');
}

const Dashboard = ({ active, setActive, user, setUser }) => {
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
      <Sidebar active={active} setActive={setActive} socketDisconnect={socketDisconnect}/>
      <div id='dashboard-charts'>
      <button onClick={handleClick}>
        {buttonText}
      </button>
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


// {
// 	"blocks": [
// 		{
// 			"type": "section",
// 			"text": {
// 				"type": "plain_text",
// 				"emoji": true,
// 				"text": "Looks like you have a conflict with these metrics:"
// 			}
// 		},
// 		{
// 			"type": "divider"
// 		},
// 		{
// 			"type": "section",
// 			"text": {
// 				"type": "mrkdwn",
// 				"text": "*cluster-demo / kafka-broker*\n BytesInPerSec Rate: 1900\n*cluster-demo / kafka-broker*\nBytesOutPerSec Rate: 1780"
// 			},
// 			"accessory": {
// 				"type": "image",
// 				"image_url": "https://freesvg.org/img/1538316074.png",
// 				"alt_text": "alert icon"
// 			}
// 		},
// 		{
// 			"type": "divider"
// 		},
// 		{
// 			"type": "context",
// 			"elements": [
// 				{
// 					"type": "image",
// 					"image_url": "https://api.slack.com/img/blocks/bkb_template_images/notificationsWarningIcon.png",
// 					"alt_text": "notifications warning icon"
// 				},
// 				{
// 					"type": "mrkdwn",
// 					"text": "*Conflicts with metrics going over threshold: 1600*"
// 				}
// 			]
// 		},
// 		{
// 			"type": "context",
// 			"elements": [
// 				{
// 					"type": "plain_text",
// 					"text": "Assigned By: Luis Navarro",
// 					"emoji": true
// 				}
// 			]
// 		}
// 	]
// }