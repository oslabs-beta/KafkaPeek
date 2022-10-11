import React from 'react';
import Select from 'react-select'


const OfflinePart = () => { 

  return (
    <div className="metricsContainer" style={{position:'relative',width:'100%',maxWidth:'960px',margin:'5px' ,marginLeft:'10px', paddingRight: '90px',boxSizing:'border-box'}}>    <h2 style={{marginBottom:'15px',fontSize:'3.6rem',lineHeight:'1.25',letterSpacing:'-.1rem',marginTop: '100px'}}>Offline Partitions</h2>
    <h2 style={{color:'#555',textAlign:'left',fontSize:'11px',fontWeight:'600',lineHeight:'38px',letterSpacing:'.1rem'}}>
    The Offline Partitions metric displays the number of partitions that do not have an active leader. 
    The two most common causes of offline partitions are when all brokers hosting replicas for a partition are down, or when no in-sync replicas can become a partition leader due to a mismatch in message counts between the replicas. 
    This is a critical metric, as any partitions that are offline (ie. without a leader) will not be accessible since read and write operations are only performed on the leader of a partition. 
</h2>
      <div className="subContainer">
        <div className="innerBoxContainer" style={{marginTop:'5px',color:'#123d57',float:'left',boxSizing:'border-box', fontSize:'20px'}}>
        Expected threshold is anything <u>over 0.</u> 
        </div>
    </div>
  </div>
  );
}

export default OfflinePart;