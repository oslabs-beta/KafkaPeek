import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const chartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  grid: {
    strokeDashArray: 0,
  },
};

const TimeSeriesChart = () => {
  const [options, setOptions] = useState(chartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: ['#F44336', '#E91E63', '#9C27B0'],
      xaxis: {
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'HH:mm',
          },
          style: {
            colors: [
              '#9C27B0',
              '#9C27B0',
              '#9C27B0',
              '#9C27B0',
              '#9C27B0',
              '#9C27B0',
              '#9C27B0',
              '#9C27B0',
              '#9C27B0',
              '#9C27B0',
              '#9C27B0',
              '#9C27B0',
            ],
          },
        },
        axisBorder: {
          show: true,
          color: 'black',
        },
        tickAmount: 7,
      },
      yaxis: {
        title: {
          text: 'Bytes In Per Second',
        },
        labels: {
          style: {
            colors: ['blue'],
          },
        },
      },
      grid: {
        borderColor: '9C27B0',
      },
      tooltip: {
        theme: 'light',
      },
    }));
  }, []);

  const [series, setSeries] = useState([
    {
      name: 'Bytes In Per Sec',
      data: [
        [1664032900, '1409'],
        [1664032910, '1268'],
        [1664032920, '1268'],
        [1664032930, '1297'],
        [1664032940, '1411'],
        [1664032950, '1411'],
        [1664032960, '1426'],
        [1664032970, '1507'],
        [1664032980, '1507'],
        [1664032990, '1596'],
        [1664033000, '1638'],
        [1664033010, '1638'],
        [1664033020, '1612'],
        [1664033030, '1725'],
        [1664033040, '1725'],
        [1664033050, '1614'],
        [1664033060, '1567'],
        [1664033070, '1567'],
        [1664033080, '1438'],
        [1664033090, '1480'],
        [1664033100, '1480'],
        [1664033110, '1436'],
        [1664033120, '1450'],
        [1664033130, '1450'],
        [1664033140, '1342'],
        [1664033150, '1358'],
        [1664033160, '1358'],
        [1664033170, '1405'],
        [1664033180, '1533'],
        [1664033190, '1533'],
      ],
    },
  ]);

  useEffect(() => {
    setSeries([
      {
        name: 'Bytes In Per Sec',
        data: [
          [1664032900, '1409'],
          [1664032910, '1268'],
          [1664032920, '1268'],
          [1664032930, '1297'],
          [1664032940, '1411'],
          [1664032950, '1411'],
          [1664032960, '1426'],
          [1664032970, '1507'],
          [1664032980, '1507'],
          [1664032990, '1596'],
          [1664033000, '1638'],
          [1664033010, '1638'],
          [1664033020, '1612'],
          [1664033030, '1725'],
          [1664033040, '1725'],
          [1664033050, '1614'],
          [1664033060, '1567'],
          [1664033070, '1567'],
          [1664033080, '1438'],
          [1664033090, '1480'],
          [1664033100, '1480'],
          [1664033110, '1436'],
          [1664033120, '1450'],
          [1664033130, '1450'],
          [1664033140, '1342'],
          [1664033150, '1358'],
          [1664033160, '1358'],
          [1664033170, '1405'],
          [1664033180, '1533'],
          [1664033190, '1533'],
        ],
      },
    ]);
  }, []);

  return (
    <div id='chart-container-3'>
      <ReactApexChart
        options={options}
        series={series}
        type='area'
        height={'450'}
      />
    </div>
  );
};

export default TimeSeriesChart;
