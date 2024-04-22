import { Icon, icons } from '@/components/icons/Icons'
import ApexChart, { type ApexChartProps } from '@/components/ui/chart'
import { cn } from '@/lib/utils'
import { type ApexOptions } from 'apexcharts'

interface Props extends ApexChartProps {
  title: string
  value: {
    before: string
    after: string
  }
}

export default function CardTrend ({ title, value, ...props }: Props): JSX.Element {
  const trendPercentage = ((parseFloat(value.after) - parseFloat(value.before)) / parseFloat(value.before)) * 100
  const isPositiveTrend = trendPercentage >= 0

  const chartOptions: ApexOptions = {
    chart: {
      sparkline: { enabled: true },
      fontFamily: 'Lato'
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: [isPositiveTrend ? 'rgb(0, 227, 150)' : 'rgb(248, 113, 113)']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [40, 100],
        colorStops: [
          {
            offset: 0,
            color: isPositiveTrend ? 'rgb(0, 227, 150)' : 'rgb(248, 113, 113)',
            opacity: 0.3
          },
          {
            offset: 100,
            color: isPositiveTrend ? 'rgb(0, 227, 150)' : 'rgb(248, 113, 113)',
            opacity: 0
          }
        ]
      }
    },
    labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`),
    tooltip: { theme: 'dark' }
  }

  return (
    <div className='max-h-40 p-5 bg-card rounded-lg grid grid-cols-2 items-end overflow-hidden' style={{ gridTemplateColumns: 'auto 1fr' }}>
      <div className='w-fit h-full flex flex-col pr-4'>
        <span className='text-md opacity-70 font-light tracking-wide'>{title}</span>
        <strong className='grow text-3xl font-semibold'>{value.after}</strong>
        <span className={cn('h-fit flex items-center gap-2 text-sm', isPositiveTrend ? 'text-emerald-500' : 'text-red-400')} title={`${trendPercentage.toFixed(2)}%`}>
          {isPositiveTrend && '+'}{trendPercentage.toFixed(2)}%
          <Icon element={icons.ArrowTrend.Up} />
        </span>
      </div>
      <ApexChart
        className=''
        width='100%'
        height='70%'
        type="area"
        options={chartOptions}
        {...props}
      />
    </div>
  )
}
