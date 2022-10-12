import React from 'react';
import Sidebar from './Sidebar';
import Select from 'react-select'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import BytesInPer from '../components/notificationComponents/BytesInPer.jsx';
import BytesOutPer from '../components/notificationComponents/BytesOutPer.jsx'
import OfflinePart from '../components/notificationComponents/OfflinePart.jsx';
import UnderRep from '../components/notificationComponents/UnderRep';
import OngoingMetrics from '../components/notificationComponents/OngoingMetrics.jsx';


const Notifications = ({ active, setActive, user, ongoingGate, setongoingGate, ongoingList, setongoingList }) => {
  // axios gate
  const [gate, setGate] = useState(false)

  // renders user selections
  const [displayedMetric, setdisplayedMetric] = useState()
  
  // final render component that will be displayed
  const [displayedComponent, setdisplayedComponent] = useState()

  // displayed value metric
  const [metric, setMetric] = useState();

  // ongoing notifications
  const [ongoingMetrics, setongoingMetrics] = useState({
    bytesInPerSec: false,
    bytesOutPerSec: false,
    offlinePartitions: false,
    underRepPartitions: false
  })

  // bytesIn (state, func)
  const [bytesInterval, setbytesInterval] = useState();
  function bytesInFunc(interval) {
    setGate(true)
    setbytesInterval(interval.value.thresholdNumber)
    setdisplayedMetric([
      <div>
        <section>
          <input type="submit" value={`  Metric:`} /> {`${interval.value.thresholdLabel}  `}
          <input type="submit" value={` Threshold:`} /> {`Anything over: ${interval.value.thresholdNumber}`}
        </section>
      </div>])
  }

  // bytesOut (state, func) 
  function bytesOutFunc(interval) {
    setGate(true)
    setbytesInterval(interval.value.thresholdNumber)
    setdisplayedMetric([
      <div>
        <section>
          <input type="submit" value={`  Metric:`} /> {`${interval.value.thresholdLabel}  `}
          <input type="submit" value={` Threshold:`} /> {`Anything over: ${interval.value.thresholdNumber}`}
        </section>
      </div>])
  }

  const subComponents = {
    bytesInPerSec: [<BytesInPer bytesInFunc={bytesInFunc} />],
    bytesOutPerSec: [<BytesOutPer bytesOutFunc={bytesOutFunc} />],
    offlinePartitions: [<OfflinePart />],
    underRepPartitions: [<UnderRep />]
  }

  // select-react
  const metrics = [
    { value: "bytesInPerSec", label: "BytesIn PerSec", },
    { value: "bytesOutPerSec", label: "BytesOut PerSec" },
    { value: "offlinePartitions", label: "Offline Partitions" },
    { value: "underRepPartitions", label: "Under Replicated Partitions" }
  ];

  const onChange = async selectedOption => {
    await setMetric(selectedOption);
    const currentNode = subComponents[selectedOption.value]
    const currentMetric = selectedOption.label
    let threshold;
    if (currentMetric === "Offline Partitions" || currentMetric === "Under Replicated Partitions") {
      threshold = 0
      setGate(true)
      setbytesInterval(threshold)
      setdisplayedMetric([
        <div>
          <section>
            <input type="submit" value={`  Metric:`} /> {`${selectedOption.label}  `}
            <input type="submit" value={` Threshold:`} /> {`Anything over: ${threshold}`}
          </section>
        </div>])
    } else {
      setGate(false)
      setdisplayedMetric([
        <div>
          <section>
            <input type="submit" value={`  Metric:`} /> {`${selectedOption.label}  `}
          </section>
        </div>])
    }
    await setdisplayedComponent(currentNode)
  };

  // sends message to slack
  const trackMetrics = async () => {
    if (gate) {
      const compared = metric.value;
      if (!ongoingMetrics[compared]) {
        const objectToSend = Object.assign({}, metric, { name: user.name }, { threshold: bytesInterval })
        await axios.post("http://localhost:4000/auth/form-submit", objectToSend)
          .then(({ data }) => {
            console.log(data)
          })
          .catch(err => {
            console.error(err.toJSON());
          });
        const newOngoing = [...ongoingList]
        newOngoing.push(<li style={{ marginTop: '5px', display: 'flex', justifyContent: 'space-between', backgroundColor: 'greenyellow', alignItems: 'center', borderRadius: '8px' }}><h2>{`${metric.label}`} {' > '} {`${bytesInterval}`}</h2><button id="stop-button">STOP</button></li>)
        setongoingList(newOngoing)
        ongoingMetrics[compared] = true
        setongoingGate(true)
        return
      } else {
        alert('You already have that metric')
        return
      }
    } else {
      alert('Please choose a threshold to track')
      return
    }
  }

  return (
    <div id='dashboard-container'>
      <Sidebar active={active} setActive={setActive} />
      <div id='dashboard-charts' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        <div className="metricsContainer" style={{ position: 'relative', maxWidth: '960px', margin: '5px', paddingLeft: '10px', boxSizing: 'border-box' }}>
          <h2 style={{ marginBottom: '15px', fontSize: '4rem', lineHeight: '1.25', letterSpacing: '-.1rem', marginTop: '100px' }}>Set up Slack Notifications</h2>
          <div className="subContainer">
            <div className="innerBoxContainer" style={{ float: 'left', boxSizing: 'border-box' }}>
              <Select width='50px' menuColor='red' options={metrics} onChange={onChange} value={metric} />
              <br />
              <h2 style={{ color: '#555', textAlign: 'left', fontSize: '11px', fontWeight: '600', lineHeight: '38px', letterSpacing: '.1rem' }}>Here, you can choose optional notificaiton in which you will receive a slack message confirming that you have selected a new metric to monitor and recieve notifications for. </h2>
              <fieldset>
                {displayedMetric}
              </fieldset>
              <section style={{ display: 'flex', justifyContent: 'space-around' }}>
                <button className='fade' onClick={trackMetrics}>
                  Track Metric
                </button>
                {ongoingGate ? <OngoingMetrics ongoingList={ongoingList} /> : null}
              </section>
            </div>
          </div>
        </div>
        <div>
          {displayedComponent}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
