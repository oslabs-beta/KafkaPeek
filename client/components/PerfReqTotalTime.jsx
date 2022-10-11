import React from 'react';

import ReactApexChart from 'react-apexcharts';

class PerfReqTotalTime extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'Mean',
        data: props.series
      }, {
        name: '99th Percentile',
        data: props.series
      }, {
        name: '75th Percentile',
        data: props.series
      }],
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
              speed: 300,
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
          text: 'Request Total Time',
          align: 'left',
        },

        noData: {
          text: "CLICK TO GET METRICS...",
        },

        markers: {
          size: 0,
          hover: {
            size: 0
          }
        },

        xaxis: {
          type: 'datetime',
          range: 600000,
        },
        yaxis: {
          min: 2,
          max: 6,
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

export default PerfReqTotalTime;
