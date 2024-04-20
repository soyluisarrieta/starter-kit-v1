import { type ApexOptions } from 'apexcharts'

export const donutOptions: ApexOptions = {
  chart: {
    fontFamily: 'Lato'
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          name: {
            show: true,
            offsetY: 35
          },
          value: {
            show: true,
            color: 'hsl(var(--card-foreground))',
            fontWeight: 600,
            fontSize: '2.2rem',
            offsetY: -10
          },
          total: {
            show: true,
            showAlways: true,
            color: 'hsl(var(--muted-foreground))',
            fontWeight: 200,
            fontSize: '1.2rem'
          }
        }
      }
    }
  },
  stroke: {
    colors: ['hsl(var(--card))'],
    width: 4
  },
  legend: {
    position: 'right',
    itemMargin: {
      horizontal: 0,
      vertical: 4
    },
    fontWeight: 500,
    fontSize: '16',
    formatter (legendName) {
      return `<span class="text-muted-foreground ml-1 pr-10">${legendName}<span>`
    },
    offsetY: 20
  }
}
