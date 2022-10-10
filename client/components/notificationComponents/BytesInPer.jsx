import React from 'react';
import Select from 'react-select'


const BytesInPer = ({bytesInFunc, bytesInPerInterval}) => { 

  const intervals = [
    { value: "1600", label: "> 1600" },
    { value: "1900", label: "> 1900" },
    { value: "2200", label: "> 2200" },
    { value: "2600", label: "> 2600" }
  ];

  const onChange = async selectedOption => {
    await setMetric(selectedOption);
  };
 
  return (
    <div className="metricsContainer" style={{position:'relative',width:'100%',maxWidth:'960px',margin:'5px' ,paddingLeft:'90px',boxSizing:'border-box'}}>
    <h2 style={{marginBottom:'15px',fontSize:'3.6rem',lineHeight:'1.25',letterSpacing:'-.1rem',marginTop: '100px'}}>BytesIn</h2>
    <h2 style={{color:'#555',textAlign:'left',fontSize:'11px',fontWeight:'600',lineHeight:'38px',letterSpacing:'.1rem'}}> Network throughput can affect Kafka’s performance if you are sending messages across data centers, if your topics have a large number of consumers, or if your replicas are catching up to their leaders. Tracking network throughput on your brokers gives you more information as to where potential bottlenecks may lie, and can inform decisions like whether or not you should enable end-to-end compression of your messages.
    The following options are thresholds that you can pick from for your BytesInPerSec Metric. 
</h2>
      <div className="subContainer">
        <div className="innerBoxContainer" style={{float:'left',boxSizing:'border-box'}}>
          <Select width='50px' menuColor='red' onChange={bytesInFunc} options={intervals} value={bytesInPerInterval} />
        </div>
    </div>
  </div>
  );
}

export default BytesInPer;