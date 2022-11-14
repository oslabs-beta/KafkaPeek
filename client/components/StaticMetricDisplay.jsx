import React from 'react';

const StaticMetricDisplay = ({ metric, title, container }) => {
  let metricStyle = `metric-container-${container}`
  if (metric == 0) metricStyle = `metric-container-${container} healthy`
  else metricStyle = `metric-container-${container} unhealthy`
  return (
    <div className={metricStyle}>
      <span>{title}</span>
      <div>{metric}</div>
    </div>
  );
}

export default StaticMetricDisplay;
