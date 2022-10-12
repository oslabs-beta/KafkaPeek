import React from 'react';
import Select from 'react-select'
const BytesOutPer = ({bytesOutFunc}) => { 

  const intervals = [
    { value: {thresholdNumber: "1500", thresholdLabel: "BytesOut PerSec"}, label: "> 1500" },
    { value: {thresholdNumber: "1900", thresholdLabel: "BytesOut PerSec"}, label: "> 1900" },
    { value: {thresholdNumber: "2200", thresholdLabel: "BytesOut PerSec"}, label: "> 2200" },
    { value: {thresholdNumber: "2600", thresholdLabel: "BytesOut PerSec"}, label: "> 2600" }
  ];

  const onChange = async selectedOption => {
    await setMetric(selectedOption);
  };

  return (
    <div className="metricsContainer" style={{position:'relative',width:'100%',maxWidth:'960px',margin:'5px' ,marginLeft:'10px', paddingRight: '90px',boxSizing:'border-box'}}>    <h2 style={{marginBottom:'15px',fontSize:'3.6rem',lineHeight:'1.25',letterSpacing:'-.1rem',marginTop: '100px'}}>BytesOut</h2>
    <h2 style={{color:'#555',textAlign:'left',fontSize:'11px',fontWeight:'600',lineHeight:'38px',letterSpacing:'.1rem'}}>
        The BytesOut metric shows the mean rate and one minute rate of outgoing bytes per second from each topic. 
        This metric will increase as the volume and frequency of messages being sent to and consumed from the topic increases. 
        If you are hitting the limit of how much your cluster can process, you should consider increasing the capacity of your cluster. 
        Please choose a threshold for to track for your BytesOut metric:
</h2>
      <div className="subContainer">
        <div className="innerBoxContainer" style={{float:'left',boxSizing:'border-box'}}>
          <Select width='50px' menuColor='red'  options={intervals} onChange={bytesOutFunc}/>
        </div>
    </div>
  </div>
  );
}

export default BytesOutPer;