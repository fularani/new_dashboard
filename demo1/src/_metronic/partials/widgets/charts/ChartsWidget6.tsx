/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../assets/ts/_utils'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'
import {DataInterface,TDate
  // ,Region,Country,City,Users
} from "../../../../app/context/AppContext"
import {formatDate} from "../../../../app/modules/widgets/components/Charts"

type Props = {
  className: string
  date:TDate[]
  data:DataInterface[]
}

const ChartsWidget6: React.FC<Props> = ({className,date,data}:Props) => {  

  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const height = parseInt(getCSS(chartRef.current, 'height'))

    const chart = new ApexCharts(chartRef.current, getChartOptions(height,date,data))
    if (chart) {
      chart.render()
    }

    return chart
  }

  useEffect(() => {
    const chart = refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef, mode,date,data])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Recent Orders</span>

          <span className='text-muted fw-semibold fs-7'>More than 500+ new orders</span>
        </h3>

        {/* begin::Toolbar */}
        <div className='card-toolbar' data-kt-buttons='true'>
          <a
            className='btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1'
            id='kt_charts_widget_6_sales_btn'
          >
            Sales
          </a>

          <a
            className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1'
            id='kt_charts_widget_6_expenses_btn'
          >
            Expenses
          </a>
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef} id='kt_charts_widget_6_chart' style={{height: '350px'}}></div>
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ChartsWidget6}

function getChartOptions(height: number,date:TDate[],data:DataInterface[]): ApexOptions {
  const labelColor = getCSSVariableValue('--kt-gray-500')
  const borderColor = getCSSVariableValue('--kt-gray-200')

  const baseColor = getCSSVariableValue('--kt-primary')
  const baseLightColor = getCSSVariableValue('--kt-primary-light')
  const secondaryColor = getCSSVariableValue('--kt-info')

  return {
    series: [
      {
        name: 'Users in India',
        type: 'bar',
        data: data.filter(d=>d.country==='India').map(d=>Number(d.users)),
      },
      {
        name: 'Users in Karnataka',
        type: 'bar',
        data: data.filter(d=>d.region==='Karnataka').map(d=>Number(d.users)),
      },
      {
        name: 'Users in Bengaluru',
        type: 'area',
        data: data.filter(d=>d.city==='Bengaluru').map(d=>Number(d.users)),
      },
    ],
    chart: {
      fontFamily: 'inherit',
      stacked: true,
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
        columnWidth: '12%',
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: -2,
      colors: ['transparent'],
    },
    xaxis: {
      type: "datetime",
      categories: date.map(val=>(formatDate(val.toString()))),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      max: 10,
      labels: {
        formatter: (value: number) => {
          return String(value);
        },
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return val.toString()
        },
      },
    },
    colors: [baseColor, secondaryColor, baseLightColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  }
}
