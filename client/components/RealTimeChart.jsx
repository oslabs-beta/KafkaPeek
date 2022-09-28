import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

class RealTimeChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{ data: props.series }, { data: props.series2 }],
      options: {
        chart: {
          id: 'realtime',
          height: '100%',
          width: '100%',
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        title: {
          text: `BytesInPerSec`,
          align: 'left',
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: 'datetime',
          range: 300000,
        },
        yaxis: {
          min: 0,
          max: 2500,
        },
        legend: {
          show: false,
        },
      },
    };
  }

  // componentDidUpdate() {
  //   // window.setInterval(() => {
  //   //   getNewSeries(lastDate, {
  //   //     min: 10,
  //   //     max: 90,
  //   //   }); // socket.io data

  //   ApexCharts.exec('realtime', 'updateSeries', [
  //     {
  //       data: props.series,
  //     },
  //   ]);
  //   // }, 1000);
  // }

  render() {
    return (
      <div id='chart-container'>
        <ReactApexChart
          options={this.state.options}
          series={this.props.series}
          type='line'
          height={'100%'}
          width={'100%'}
        />
      </div>
    );
  }
}

export default RealTimeChart;
