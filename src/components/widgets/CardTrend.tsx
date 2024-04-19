import { Icon, icons } from '@/components/icons/Icons'
import ApexChart, { type ApexChartProps } from '@/components/ui/chart'
import { areaSparklineOptions } from '@/lib/apex-charts/areaOptions'
import { cn } from '@/lib/utils'
import { mergeObjects } from '@/lib/utils/handleObjects'
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
    stroke: {
      colors: [isPositiveTrend ? 'rgb(0, 227, 150)' : 'rgb(248, 113, 113)']
    },
    fill: {
      gradient: {
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
    }
  }
  return (
    <div className='max-h-40 p-5 bg-card rounded-lg flex items-end justify-between'>
      <div className='w-fit h-full flex flex-col'>
        <span className='text-lg opacity-70 font-light tracking-wide'>{title}</span>
        <strong className='grow text-3xl font-semibold'>{value.after}</strong>
        <span className={cn('h-fit flex items-center gap-2', isPositiveTrend ? 'text-emerald-500' : 'text-red-400')} title={`${trendPercentage.toFixed(2)}%`}>
          {isPositiveTrend && '+'}{trendPercentage.toFixed(2)}%
          <Icon element={icons.ArrowTrend.Up} />
        </span>
      </div>
      <ApexChart
        width='90%'
        height='90%'
        type="area"
        options={mergeObjects(chartOptions, areaSparklineOptions)}
        {...props}
      />
    </div>
  )
}
