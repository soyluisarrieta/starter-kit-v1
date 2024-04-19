import { type ApexOptions } from 'apexcharts'

export const areaSparklineOptions: ApexOptions = {
  chart: {
    sparkline: { enabled: true }
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [40, 100]
    }
  },
  labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`),
  tooltip: { theme: 'dark' }
}
