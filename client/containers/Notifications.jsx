import React from 'react';
import Sidebar from './Sidebar';
import Select from 'react-select'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import BytesInPer from '../components/notificationComponents/BytesInPer.jsx';
import BytesOutPer from '../components/notificationComponents/BytesOutPer.jsx'
import OfflinePart from '../components/notificationComponents/Offlinepart.jsx';
import UnderRep from '../components/notificationComponents/UnderRep';



const Notifications = ({ active, setActive, user}) => {
  // ------ gate that allows axios POST request --------------
  const [gate, setGate] = useState(false)

  // ------------ BYTES IN (STATE, FUNC) 
  const [bytesInterval, setbytesInterval] = useState();
  function bytesInFunc(interval){
    setGate(true)
    setbytesInterval(interval.value.thresholdNumber)
    setdisplayedMetric([
      <div>
        <section>
          <input type="submit" value={`  Metric:`}/> {`${interval.value.thresholdLabel}  `}
          <input type="submit" value={` Threshold:`}/> {`Anything over: ${interval.value.thresholdNumber}`}
        </section>
        </div>])
  }

  // ------------ BYTES OUT (STATE, FUNC) 
  // const [bytesOutPerInterval, setbytesOutPerInterval] = useState();

  function bytesOutFunc(interval){
    setGate(true)
    setbytesInterval(interval.value.thresholdNumber)
    setdisplayedMetric([
      <div>
        <section>
          <input type="submit" value={`  Metric:`}/> {`${interval.value.thresholdLabel}  `}
          <input type="submit" value={` Threshold:`}/> {`Anything over: ${interval.value.thresholdNumber}`}
        </section>
        </div>])
  }

  // --------------------------------- final render component that will be displayed
  const [displayedComponent, setdisplayedComponent] = useState()
  // --------------------------------- bank of different component options
  const subComponents = {
    bytesInPerSec:[<BytesInPer bytesInFunc={bytesInFunc} />],
    bytesOutPerSec: [<BytesOutPer bytesOutFunc={bytesOutFunc} />],
    offlinePartitions: [<OfflinePart />],
    underRepPartitions: [<UnderRep />]
  }

  const [displayedMetric, setdisplayedMetric] = useState()
  //------------------ Select-React Options -------------------
  const metrics = [
    { value: "bytesInPerSec", label: "BytesIn PerSec", },
    { value: "bytesOutPerSec", label: "BytesOut PerSec" },
    { value: "offlinePartitions", label: "Offline Partitions" },
    { value: "underRepPartitions", label: "Under Replicated Partitions" }
  ];
  // displayed metric for left (main) component
  const [metric, setMetric] = useState();
  const onChange = async selectedOption => {
    console.log(selectedOption)
    await setMetric(selectedOption);
    const currentNode = subComponents[selectedOption.value]
    const currentMetric = selectedOption.label
    let threshold;
    if (currentMetric === "Offline Partitions" || currentMetric === "Under Replicated Partitions"){
      threshold = 0
      setGate(true)
      setbytesInterval(threshold)
      setdisplayedMetric([
        <div>
          <section>
            <input type="submit" value={`  Metric:`}/> {`${selectedOption.label}  `}
            <input type="submit" value={` Threshold:`}/> {`Anything over: ${threshold}`}
          </section>
          </div>])
    }else{
      setGate(false)
      setdisplayedMetric([
        <div>
          <section>
            <input type="submit" value={`  Metric:`}/> {`${selectedOption.label}  `}
          </section>
          </div>])
    }
    await setdisplayedComponent(currentNode)
  };

  
  //------ final function to send message to slack ---------------------
  const trackMetrics = async () => {
    console.log('logging-->',gate)
    if(gate){
      const objectToSend = Object.assign({}, metric, {name: user.name}, {threshold: bytesInterval} )
      console.log('logging inside button', objectToSend, metric)
      await axios.post("http://localhost:4000/auth/form-submit", objectToSend)
      .then(({ data }) => {
        console.log('loggin data from frontend',data)
      })
      .catch(err => {
        console.error(err.toJSON());
      });
      return
    }else{
      return
    }
   
  }
  
  return (
  <div id='dashboard-container'>
    <Sidebar active={active} setActive={setActive}/>
    <div id='dashboard-charts' style={{ display:'flex', justifyContent:'space-around', alignItems:'flex-start'}}>
      <div className="metricsContainer" style={{position:'relative',maxWidth:'960px',margin:'5px' ,paddingLeft:'10px',boxSizing:'border-box'}}>
        <h2 style={{marginBottom:'15px',fontSize:'4rem',lineHeight:'1.25',letterSpacing:'-.1rem',marginTop: '100px'}}>Set up Slack Notifications</h2>
        <div className="subContainer">
          <div className="innerBoxContainer" style={{float:'left',boxSizing:'border-box'}}>
            <Select width='50px' menuColor='red' options={metrics} onChange={onChange} value={metric} />
            <br/>
            <h2 style={{color:'#555',textAlign:'left',fontSize:'11px',fontWeight:'600',lineHeight:'38px',letterSpacing:'.1rem'}}>Once you click 'Track Metric' you will receive a slack notification confirming that you have selected a new metric to monitor to recieve notifications for. </h2>
            <fieldset>
              {displayedMetric}
            </fieldset>
            <button className='fade' onClick={trackMetrics}>
            Track Metric
          </button>
          </div>
        </div>
      </div>

{/*----------------------break--------------------------------------------------------------------------------------*/}
      <div>
        {displayedComponent}
      </div>
    </div>
  </div>
  );
}

export default Notifications;
