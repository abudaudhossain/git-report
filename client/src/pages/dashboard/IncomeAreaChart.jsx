import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { dataProcess } from 'utils/repositories';
import { map } from 'lodash';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

export default function IncomeAreaChart({ slot, repositories }) {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const [data, setData] = useState(dataProcess(45, repositories))
  const [options, setOptions] = useState(areaChartOptions);

  const [series, setSeries] = useState([
    {
      name: 'All',
      data: Object.values(data.dateWise)
    }
  ]);

  useEffect(() => {
    let colors = [];
    // Dynamically generate colors based on contributors
    colors.push(`#${Math.floor(Math.random()*255*255*255).toString(16)}`);
    Object.keys(data.dateWiseContributorsCommitsCount).forEach((contributor, index) => {
      colors.push(`#${Math.floor(Math.random()*255*255*255).toString(16)}`);
    });
    console.log(colors)
    setOptions((prevState) => ({
      ...prevState,
      colors: colors, // Apply the dynamic colors array
      xaxis: {
        categories: Object.keys(data.dateWise),
        labels: {
          style: {
            colors: Object.keys(data.dateWise).map(() => secondary) // Repeat `secondary` for each category
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: Object.keys(data.dateWise).length
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      }
    }));
  }, [primary, secondary, line, theme, slot, data]);


  useEffect(() => {

    let contributors = []
    for (let contributor of Object.keys(data.dateWiseContributorsCommitsCount)) {
      contributors.push({
        name: contributor,
        data: Object.values(data.dateWiseContributorsCommitsCount[contributor])
      })
    }

    setSeries([
      {
        name: 'ALL',
        data: Object.values(data.dateWise)
      },
      ...contributors

    ]);
  }, [slot,
    data
  ]);
  useEffect(() => {
    setData(dataProcess(slot != "all" ? parseInt(slot) : 45, repositories))
  }, [slot])

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
}

IncomeAreaChart.propTypes = { slot: PropTypes.string };
