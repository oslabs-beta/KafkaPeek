import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Sidebar from './Sidebar';
import StaticMetricDisplay from '../components/StaticMetricDisplay';
import PerfReqTotalTime from '../components/PerfReqTotalTime';
import PerfResQueueTime from '../components/PerfResQueueTime';
import PerfResSendTime from '../components/PerfResSendTime';

// front-end socket
const socket = io('https://kafkapeek.herokuapp.com/', {
  autoConnect: false
});
// https://kafkapeek.herokuapp.com/
// performance metrics mbean args
export const params = {
  'requestTotalTime': ["kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='Total',env='cluster-demo'}", "[10m:10s]"],
  'responseQueueTime': ["kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='ResponseQueue',env='cluster-demo', aggregate='99thPercentile'}", "[10m:10s]"],
  'responseSendTime': ["kafka_network_request_metrics_time_ms{instance='jmx-kafka:5556', request='FetchConsumer',scope='ResponseSend',env='cluster-demo', aggregate='Mean'}", "[10m:10s]"],
  'requestsPerSec': ["kafka_network_request_per_sec{aggregate=~'OneMinuteRate',request='Produce'}", ""]
}

// socket.io function sends mbean args to back-end promql request
const emitFunc = () => {
  socket.emit('performance', params)
}

// socket.io function sends 'stop' to back-end to stop interval
const stopFunc = () => {
  socket.emit('stop');
}

const PerfDashboard = ({ active, setActive}) => {
  let startMetric = useRef(false);

  // text to be displayed inside button
  const [buttonText, setButtonText] = useState('Get Metrics');

  // dynamic metrics
  const [resQueueTime, setResQueueTime] = useState([]);
  const [resSendTime, setResSendTime] = useState([]);
  const [reqTTMean, setReqTTMean] = useState([]);
  const [reqTTSeventyFifth, setReqTTSeventyFifth] = useState([]);
  const [reqTTNinetyNinth, setReqTTNinetyNinth] = useState([]);
  
  // static metrics
  const [reqPerSec, setReqPerSec] = useState(0)

  // displays and pauses metrics to graphs
  const handleClick = () => {
    if (!startMetric.current) {
      socket.connect();
      emitFunc();
      setButtonText('Pause');
      startMetric.current = !startMetric.current;
    } else {
      stopFunc();
      setButtonText('Get Metrics');
      startMetric.current = !startMetric.current;
    }
  }

  // stops incoming metrics from back-end
  const handlePerfDisconnect = () => {
    socket.disconnect()
  }

  // listens to incoming metrics from back-end socket.io 'performance' socket
  useEffect(() => {
    socket.on('performance', (data) => {
      if (data.requestsPerSec) {
        setReqPerSec(parseFloat(data.requestsPerSec[0][1]).toFixed(3));
      }
      const [mean, ninetyNinth, seventyFifth] = data.requestTotalTime;
      setReqTTMean(currentData => [...currentData, ...mean]);
      setReqTTNinetyNinth(currentData => [...currentData, ...ninetyNinth]);
      setReqTTSeventyFifth(currentData => [...currentData, ...seventyFifth]);
      setResQueueTime(currentData => [...currentData, ...data.responseQueueTime]);
      setResSendTime(currentData => [...currentData, ...data.responseSendTime]);
    })
  }, []);

  return (
    <div id='dashboard-container'>
      <Sidebar active={active} setActive={setActive} handlePerfDisconnect={handlePerfDisconnect}/>
      <div id='dashboard-charts'>
        <StaticMetricDisplay metric={reqPerSec} title={"Requests Per Second"} container={1} />
        <StaticMetricDisplay container={2} />
        <StaticMetricDisplay container={3} />
        <StaticMetricDisplay container={4} />
        <PerfReqTotalTime series={[{ name: 'Mean', data: reqTTMean }, { name: '99th Percentile', data: reqTTNinetyNinth }, { name: '75th Percentile', data: reqTTSeventyFifth }]} />
        <PerfResQueueTime series={[{ name: 'Response Queue Time', data: resQueueTime }]} />
        <PerfResSendTime series={[{ name: 'Response Send Time', data: resSendTime }]} />
        <button onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PerfDashboard;
