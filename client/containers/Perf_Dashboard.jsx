import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import StaticMetricDisplay from '../components/StaticMetricDisplay';
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
    // 'processorIdlePercent' : ["kafka_network_processor_idle_percent","[10m:10s]"],
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
  const [resQueueTime, setResQueueTime] = useState([]);
  const [resSendTime, setResSendTime] = useState([]);
  const [ reqTTMean, setReqTTMean ] = useState([]);
  const [reqTTSeventyFifth, setReqTTSeventyFifth] = useState([]);
  const [reqTTNinetyNinth, setReqTTNinetyNinth] = useState([]);
  // const [netPIPFirst, setPIPFirst] = useState([]);
  // const [netPIPSecond, setPIPSecond] = useState([]);
  // const [netPIPThird, setPIPThird] = useState([]);
  // const [netPIPFourth, setPIPFourth] = useState([]);
  // const [netPIPFifth, setPIPFifth] = useState([]);
  // const [netPIPSixth, setPIPSixth] = useState([]);
  //Static Metrics
  const [reqPerSec, setReqPerSec] = useState(0)
  

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
      if(data.requestsPerSec) {
        setReqPerSec(parseFloat(data.requestsPerSec[0][1]).toFixed(3));
      }
      const [ mean, ninetyNinth, seventyFifth ] = data.requestTotalTime;
      setReqTTMean(currentData => [...currentData, ...mean]);
      setReqTTNinetyNinth(currentData => [...currentData, ...ninetyNinth]);
      setReqTTSeventyFifth(currentData => [...currentData, ...seventyFifth]);
      setResQueueTime(currentData => [...currentData, ...data.responseQueueTime]);
      setResSendTime(currentData => [...currentData, ...data.responseSendTime]);

      // const [ first, second, third, fourth, fifth, sixth ] = data.processorIdlePercent;
      // setPIPFirst(currentData => [...currentData, ...first[0][1]]);
      // setPIPSecond(currentData => [...currentData, ...second[0][1]]);
      // setPIPThird(currentData => [...currentData, ...third[0][1]]);
      // setPIPFourth(currentData => [...currentData, ...fourth[0][1]]);
      // setPIPFifth(currentData => [...currentData, ...fifth[0][1]]);
      // setPIPSixth(currentData => [...currentData, ...sixth[0][1]]);
      // console.log(first[0][1], second[0][1], third[0][1], fourth[0][1], fifth[0][1], sixth[0][1])
      // console.log(data.processorIdlePercent, '<-------processor Idle Percentage')
      
     }) 
  }, []);

     
          

  

  return (
    <div id='dashboard-container'>
      <Sidebar active={active} setActive={setActive} socketDisconnect={socketDisconnect}/>
      <div id='dashboard-charts'>
        <StaticMetricDisplay metric={reqPerSec} title={"Requests Per Second"} container={1}/>
        <StaticMetricDisplay container={2}/>
        <StaticMetricDisplay container={3}/>
        <StaticMetricDisplay container={4}/>
        <Perf_ReqTotalTime series={[{name: 'Mean', data: reqTTMean},{name: '99th Percentile', data: reqTTNinetyNinth}, {name: '75th Percentile', data: reqTTSeventyFifth}]} /> 
        <Perf_ResQueueTime series={[{name: 'Response Queue Time', data: resQueueTime}]} />
        <Perf_ResSendTime series={[{name: 'Response Send Time', data: resSendTime}]} />
        {/* <Perf_ProcIdlePercent series={[{name: '1', data: netPIPFirst}, {name: '2', data: netPIPSecond}, {name: '3', data: netPIPThird}, {name: '4', data: netPIPFourth}, {name: '5', data: netPIPFifth}, {name: '6', data: netPIPSixth}]}/> */}
        <button onClick={handleClick}>
          {buttonText}
        </button>
      </div>
      {/* Create a main component that renders charts or settings, etc. */}
    </div>
  );
};

export default Dashboard;
