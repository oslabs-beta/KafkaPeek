import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const LineChart = () => {
  const [options, setOptions] = useState({
    chart: {
      height: 200,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
  });
  const [series, setSeries] = useState([
    {
      name: 'Desktops',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ]);

  return (
    <div id='chart-container'>
      <Chart options={options} series={series} type='line' height={'100%'} />
    </div>
  );
};

export default LineChart;
