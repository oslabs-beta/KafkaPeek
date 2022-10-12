import React from 'react';

const OngoingMetrics = ({ongoingList}) => { 

  return (
    <div className="stop-button-container" style={{marginTop:'10px'}}>
        <h2 style={{fontSize:'1.8rem',lineHeight:'1.95',letterSpacing:'.2rem'}}>ONGOING METRICS</h2>
        <section>
          <ul >
            {ongoingList}
          </ul>
        </section>
  </div>
  );
}

export default OngoingMetrics;