import React from 'react';
import Select from 'react-select'
const BytesOutPer = ({bytesOutFunc, bytesOutPerInterval}) => { 
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
    <h2 style={{marginBottom:'15px',fontSize:'3.6rem',lineHeight:'1.25',letterSpacing:'-.1rem',marginTop: '100px'}}>BytesOut</h2>
    <h2 style={{color:'#555',textAlign:'left',fontSize:'11px',fontWeight:'600',lineHeight:'38px',letterSpacing:'.1rem'}}>
        The BytesOut metric shows the mean rate and one minute rate of outgoing bytes per second from each topic. 
        This metric will increase as the volume and frequency of messages being sent to and consumed from the topic increases. 
        If you are hitting the limit of how much your cluster can process, you should consider increasing the capacity of your cluster. 
        Please choose a threshold for to track for your BytesOut metric:
</h2>
      <div className="subContainer">
        <div className="innerBoxContainer" style={{float:'left',boxSizing:'border-box'}}>
          <Select width='50px' menuColor='red' onChange={bytesOutFunc} options={intervals} value={bytesOutPerInterval} />
        </div>
    </div>
  </div>
  );
}

export default BytesOutPer;