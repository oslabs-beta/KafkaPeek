import React, { useState } from 'react';
import Chart from 'react-apexcharts';

// class RealTimeChart extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       series: [
//         {
//           data: data.slice(),
//         },
//       ],
//       options: {
//         chart: {
//           id: 'realtime',
//           height: 350,
//           type: 'line',
//           animations: {
//             enabled: true,
//             easing: 'linear',
//             dynamicAnimation: {
//               speed: 1000,
//             },
//           },
//           toolbar: {
//             show: false,
//           },
//           zoom: {
//             enabled: false,
//           },
//         },
//         dataLabels: {
//           enabled: false,
//         },
//         stroke: {
//           curve: 'smooth',
//         },
//         title: {
//           text: 'Dynamic Updating Chart',
//           align: 'left',
//         },
//         markers: {
//           size: 0,
//         },
//         xaxis: {
//           type: 'datetime',
//           range: XAXISRANGE,
//         },
//         yaxis: {
//           max: 100,
//         },
//         legend: {
//           show: false,
//         },
//       },
//     };
//   }

//   componentDidMount() {
//     window.setInterval(() => {
//       getNewSeries(lastDate, {
//         min: 10,
//         max: 90,
//       });

//       ApexCharts.exec('realtime', 'updateSeries', [
//         {
//           data: data,
//         },
//       ]);
//     }, 1000);
//   }

//   render() {
//     return (
//       <div id='chart-container-3'>
//         <Chart
//           options={this.state.options}
//           series={this.state.series}
//           type='line'
//           height={350}
//         />
//       </div>
//     );
//   }
// }

const RealTimeChart = () => {
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
    <div id='chart-container-2'>
      <Chart options={options} series={series} type='line' height={'100%'} />
    </div>
  );
};

export default RealTimeChart;
