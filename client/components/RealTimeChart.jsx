import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';




class RealTimeChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{ 
        name: 'Bytes In/sec',
        data: props.series 
      }, {
        name: 'Bytes Out/sec',
        data: props.series
      }],
      options: {
        chart: {
          id: 'realtime',
          height: 350,
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000,
            },
          },
          toolbar: {
            show: true,
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
          text: 'Bytes In/sec & Bytes Out/sec',
          align: 'left',
        },
        
        markers: {
          size: 0,
          hover: {
            size: 0
          }
        },
        
        xaxis: {
          type: 'datetime',
          range: 300000, 
        },
        yaxis: {
          min: 0,
          max: 2500,
          decimalsInFloat: 2,
          opposite: true,
          labels: {
            offsetX: -10
          }
        },
        legend: {
          show: true,
          floating: true,
          horizontalAlign: 'left',
          onItemClick: {
            toggleDataSeries: false
          },
          position: 'top',
          offsetY: -20,
          offsetX: 300
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
          height={350}
        />
      </div>
    );
  }
}

export default RealTimeChart;
