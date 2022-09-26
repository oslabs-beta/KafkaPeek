import React, { useState } from 'react';
import Chart from 'react-apexcharts';



class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
        name: 'XYZ MOTORS',
        data: dates
      }],
      options: {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'Stock Price Movement',
          align: 'left'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return (val / 1000000).toFixed(0);
            },
          },
          title: {
            text: 'Price'
          },
        },
        xaxis: {
          type: 'datetime',
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return (val / 1000000).toFixed(0)
            }
          }
        }
      },
    
    
    };
  }



  render() {
    return (
      


<div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
</div>



    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(ApexChart), domContainer);

export default TimeSeriesChart;
