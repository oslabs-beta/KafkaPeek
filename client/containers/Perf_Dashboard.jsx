import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';

import Perf_ReqPerSec from '../components/Perf_ReqPerSec';
import Perf_ReqTotalTime from '../components/Perf_ReqTotalTime';        
import Perf_ResQueueTime from '../components/Perf_ResQueueTime';
import Perf_ResSendTime from '../components/Perf_ResSendTime';
import Perf_ProcIdlePercent from '../components/Perf_ProcIdlePercent';

import { io } from 'socket.io-client';

const socket = io('http://localhost:4000', {
  autoConnect: false
});

const emitFunc = () => {
  socket.emit('performance', {
    'processorIdlePercent' : ["kafka_network_processor_idle_percent","[10m:10s]"],
    'requestTotalTime' :["kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='Total',env='cluster-demo'}","[10m:10s]"],
    'responseQueueTime' : ["kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='ResponseQueue',env='cluster-demo', aggregate='99thPercentile'}","[10m:10s]"],
    'responseSendTime' : ["kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='ResponseSend',env='cluster-demo', aggregate='Mean'}","[10m:10s]"],
    'requestsPerSec': ["kafka_network_request_per_sec{aggregate=~'OneMinuteRate',request='Produce'}",""]
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
  const [reqPerSec, setReqPerSec] = useState([])
  const [resQueueTime, setResQueueTime] = useState([]);
  const [resSendTime, setResSendTime] = useState([]);
  const [procIdlePercent, setProcIdlePercent] = useState([]);
  const [ reqTTMean, setReqTTMean ] = useState([]);
  const [reqTTSeventyFifth, setReqTTSeventyFifth] = useState([]);
  const [reqTTNinetyNinth, setReqTTNinetyNinth] = useState([]);
  
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
      // setReqPerSec(currentData => [...currentData, ...data.requestsPerSec])
      const [ mean, ninetyNinth, seventyFifth ] = data.requestTotalTime;
      // console.log('mean', mean);
      // console.log('ninetyNinth', ninetyNinth)
      console.log(data.processorIdlePercent)
      setReqTTMean(currentData => [...currentData, ...mean]);
      setReqTTNinetyNinth(currentData => [...currentData, ...ninetyNinth]);
      setReqTTSeventyFifth(currentData => [...currentData, ...seventyFifth]);
      setResQueueTime(currentData => [...currentData, ...data.responseQueueTime]);
      setResSendTime(currentData => [...currentData, ...data.responseSendTime]);
      // setProcIdlePercent(currentData => [...currentData, ...data.processorIdlePercent]);  
     }) 
  }, []);

     
          

  

  return (
    <div id='dashboard-container'>
      <Sidebar active={active} setActive={setActive} socketDisconnect={socketDisconnect}/>
      <div id='dashboard-charts'>
      <button onClick={handleClick}>
        {buttonText}
      </button>
        {/* <Perf_ReqPerSec series={[{name: 'Requests Per Second', data: reqPerSec}]} />  */}
        {/* <Perf_ReqTotalTime series={[{name: 'Mean', data: reqTotalTime[0], }]} />  */}
        <Perf_ReqTotalTime series={[{name: 'Mean', data: reqTTMean},{name: '99th Percentile', data: reqTTNinetyNinth}, {name: '75th Percentile', data: reqTTSeventyFifth}]} /> 
        <Perf_ResQueueTime series={[{name: 'Response Queue Time', data: resQueueTime}]} />
        <Perf_ResSendTime series={[{name: 'Response Send Time', data: resSendTime}]} />
        {/* <Perf_ProcIdlePercent series={[{name: 'Processor Idle Percent', data: procIdlePercent}]} /> */}
        
      </div>
      {/* Create a main component that renders charts or settings, etc. */}
    </div>
  );
};

export default Dashboard;
