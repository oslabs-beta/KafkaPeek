import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';




class Perf_ProcIdlePercent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    //   series: [
    //     {name: '1', data: props.series}, 
    //   {name: '2', data: props.series}, 
    //   {name: '3', data: props.series}, 
    //   {name: '4', data: props.series}, 
    //   {name: '5', data: props.series}, 
    //   {name: '6', data: props.series}
    // ],
      series: [1, 1, 1, 1, 1, 1],
      chart: {
        type: 'radialBar',
        height: 320,
        offsetY: -30,
        offsetX: 20
      },
      plotOptions: {
        radialBar: {
          size: undefined,
          inverseOrder: false,
          hollow: {
            margin: 5,
            size: '48%',
            background: 'transparent',
          },
          track: {
            show: true,
            background: '#40475D',
            strokeWidth: '10%',
            opacity: 1,
            margin: 3, // margin is in pixels
          },
    
    
        },
      },
      
      labels: ['Device 1', 'Device 2'],
      legend: {
        show: true,
        position: 'left',
        offsetX: -30,
        offsetY: 10,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      }
    }
  }

  render() {
    return (
      <div id='metric-container-2'>
        <ReactApexChart
          options={this.state.options}
          series={this.props.series}
          type='radialBar'
          height={'100%'}
          
        />
      </div>
    );
  }
}

export default Perf_ProcIdlePercent;
