import React from 'react';

import ReactApexChart from 'react-apexcharts';

class HealthMsgIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{ data: props.series }],
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
          width: 2,
        },
        title: {
          text: 'Messages In Per Second',
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
          range: 600000,
        },
        yaxis: {
          min: 0,
          max: 300,
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
      <div id='chart-container-2'>
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

export default HealthMsgIn;
