import React from 'react';
import Sidebar from './Sidebar';
import Select from 'react-select'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import BytesInPer from '../components/notificationComponents/BytesInPer.jsx';



const Notifications = ({ active, setActive, user}) => {
  const [bytesInPerInterval, setbytesInPerInterval] = useState(0);
  function bytesInFunc(interval){
    setbytesInPerInterval(interval)
  }
  const metrics = [
    { value: "bytesInPerSec", label: "BytesInPerSec", },
    { value: "bytesOutPerSec", label: "BytesOutPerSec" },
    { value: "offlinePartitions", label: "Offline Partitions" },
    { value: "underRepPartitions", label: "Under Replicated Partitions" }
  ];
  const [metric, setMetric] = useState(metrics[0]);

  const onChange = async selectedOption => {
    await setMetric(selectedOption);
  };

  const trackMetrics = async () => {
    const sendingObj = Object.assign(metric, {name: user.name})
    await axios.post("http://localhost:4000/auth/form-submit", metric)
    .then(({ data }) => {
      console.log('loggin data from frontend',data)
    })
    .catch(err => {
      console.error(err.toJSON());
    });
  }
  
  return (
  <div id='dashboard-container'>
    <Sidebar active={active} setActive={setActive}/>
    <div id='dashboard-charts' style={{ display:'flex', justifyContent:'space-evenly', alignItems:'flex-start'}}>
      <div className="metricsContainer" style={{position:'relative',width:'100%',maxWidth:'960px',margin:'5px' ,paddingLeft:'90px',boxSizing:'border-box'}}>
        <h2 style={{marginBottom:'15px',fontSize:'3.6rem',lineHeight:'1.25',letterSpacing:'-.1rem',marginTop: '100px'}}>Set up Slack Notifications</h2>
        <div className="subContainer">
          <div className="innerBoxContainer" style={{float:'left',boxSizing:'border-box'}}>
            <Select width='50px' menuColor='red' options={metrics} onChange={onChange} value={metric} />
            <br/>
            <h2 style={{color:'#555',textAlign:'left',fontSize:'11px',fontWeight:'600',lineHeight:'38px',letterSpacing:'.1rem'}}>Once you click 'Track Metric' you will receive a slack notification confirming that you have selected a new metric to monitor to recieve notifications for. </h2>
            <button style={{marginTop: '15px',padding: '20px',backgroundColor: '#123d57',fontSize: '24px', borderRadius: '4px', color: 'white', fontWeight: 'bold'}}onClick={trackMetrics}>
            Track Metric
          </button>
          </div>
        </div>
      </div>

{/*----------------------break---------------------------------------------------*/}
      <div>
        <BytesInPer metrics = {metrics} metric ={metric} bytesFunc={bytesInFunc} bytesInPerInterval={bytesInPerInterval}/>
      </div>
    </div>
  </div>
  );
}

export default Notifications;
