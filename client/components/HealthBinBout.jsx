import React from 'react';

import ReactApexChart from 'react-apexcharts';

class HealthBinBout extends React.Component {
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
          height: '100%',
          width: '10%',
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 5000,
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
          text: 'Bytes In/sec & Bytes Out/sec',
          align: 'left',
        },

        noData: {
          text: "CLICK BELOW TO GET METRICS...",
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

export default HealthBinBout;
