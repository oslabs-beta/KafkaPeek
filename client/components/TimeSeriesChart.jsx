import React, { useState } from 'react';
import Chart from 'react-apexcharts';

// const TimeSeriesChart = () => {
//   const [options, setOptions] = useState({
//     chart: {
//       type: 'area',
//       stacked: false,
//       height: 350,
//       zoom: {
//         type: 'x',
//         enabled: true,
//         autoScaleYaxis: true,
//       },
//       toolbar: {
//         autoSelected: 'zoom',
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     markers: {
//       size: 0,
//     },
//     title: {
//       text: 'Stock Price Movement',
//       align: 'left',
//     },
//     fill: {
//       type: 'gradient',
//       gradient: {
//         shadeIntensity: 1,
//         inverseColors: false,
//         opacityFrom: 0.5,
//         opacityTo: 0,
//         stops: [0, 90, 100],
//       },
//     },
//     yaxis: {
//       labels: {
//         formatter: function (val) {
//           return (val / 1000000).toFixed(0);
//         },
//       },
//       title: {
//         text: 'Price',
//       },
//     },
//     xaxis: {
//       type: 'datetime',
//     },
//     tooltip: {
//       shared: false,
//       y: {
//         formatter: function (val) {
//           return (val / 1000000).toFixed(0);
//         },
//       },
//     },
//   });
//   const [series, setSeries] = useState([
//     {
//       name: 'XYZ MOTORS',
//       data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
//     },
//   ]);

//   return (
//     <div id='chart-container-2'>
//       <Chart options={options} series={series} type='line' height={350} />
//     </div>
//   );
// };

const TimeSeriesChart = () => {
  const [options, setOptions] = useState({
    chart: {
      height: 350,
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
    <div id='chart-container-3'>
      <Chart options={options} series={series} type='line' height={'100%'} />
    </div>
  );
};

export default TimeSeriesChart;
