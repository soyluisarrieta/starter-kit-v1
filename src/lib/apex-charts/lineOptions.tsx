import { type ApexOptions } from 'apexcharts'

export const lineOptions: ApexOptions = {
  chart: {
    height: 350,
    type: 'line',
    fontFamily: 'Lato',
    background: 'transparent',
    toolbar: { show: false },
    zoom: { enabled: false },
    offsetY: -30
  },
  legend: {
    itemMargin: { horizontal: 10 },
    position: 'top',
    horizontalAlign: 'right',
    labels: { colors: 'hsl(var(--card-foreground))' },
    fontWeight: 500,
    fontSize: '16'
  },
  stroke: {
    width: 3.7,
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    axisBorder: { show: false },
    labels: {
      style: { colors: 'hsl(var(--muted-foreground))' }
    }
  },
  yaxis: {
    min: 0,
    labels: {
      style: { colors: 'hsl(var(--muted-foreground))' }
    }
  },
  tooltip: {
    theme: 'dark'
  },
  grid: {
    borderColor: 'hsl(var(--muted-foreground) / 18%)',
    strokeDashArray: 5,
    padding: { top: 10 }
  }
}
