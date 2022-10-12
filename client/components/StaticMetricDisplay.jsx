import React from 'react';

function StaticMetricDisplay({ metric, title, container }) {
  return (
    <div id={`metric-container-${container}`}>
      <span>{title}</span>
      <div>{metric}</div>
    </div>
  );
}

export default StaticMetricDisplay;
