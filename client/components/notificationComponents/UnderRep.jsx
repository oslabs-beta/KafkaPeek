import React from 'react';
import Select from 'react-select';

function UnderRep() {
  return (
    <div
      className="metricsContainer"
      style={{
        position: 'relative', width: '100%', maxWidth: '960px', margin: '5px', marginLeft: '10px', paddingRight: '90px', boxSizing: 'border-box',
      }}
    >
      <h2 style={{
        marginBottom: '15px', fontSize: '3.6rem', lineHeight: '1.25', letterSpacing: '-.1rem', marginTop: '100px',
      }}
      >
        Under Replicated Partitions
      </h2>
      <h2 style={{
        color: '#555', textAlign: 'left', fontSize: '11px', fontWeight: '600', lineHeight: '38px', letterSpacing: '.1rem',
      }}
      >
        In a healthy cluster, the number of in sync replicas (ISRs) should be exactly equal to the total number of replicas.
        If partition replicas fall too far behind their leaders, the follower partition is removed from the ISR pool, and you should see a corresponding increase in IsrShrinksPerSec.
        If a broker becomes unavailable, the value of UnderReplicatedPartitions will increase sharply.
        Since Kafka’s high-availability guarantees cannot be met without replication, investigation is certainly warranted should this metric value exceed zero for extended time periods.
      </h2>
      <div className="subContainer">
        <div
          className="innerBoxContainer"
          style={{
            marginTop: '5px', color: '#123d57', float: 'left', boxSizing: 'border-box', fontSize: '20px',
          }}
        >
          Expected threshold is anything
          {' '}
          <u>over 0.</u>
        </div>
      </div>
    </div>
  );
}

export default UnderRep;
