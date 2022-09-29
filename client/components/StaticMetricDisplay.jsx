import React from 'react';

const StaticMetricDisplay = ({ metric, title, container }) => { 
  // console.log("METRIC", title, metric)
  return (
    <div id={`metric-container-${container}`}>
      <span>{title}</span>
      <div>{metric}</div>
    </div>
  );
}

export default StaticMetricDisplay;
