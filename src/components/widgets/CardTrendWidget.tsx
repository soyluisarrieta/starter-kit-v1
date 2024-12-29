import { Icon, icons } from '@/components/icons/Icons'
import { cn } from '@/lib/utils'

interface Props {
  title: string
  value: {
    before: string
    after: string
  }
}

export default function CardTrend ({ title, value }: Props): JSX.Element {
  const trendPercentage = ((parseFloat(value.after) - parseFloat(value.before)) / parseFloat(value.before)) * 100
  const isPositiveTrend = trendPercentage >= 0

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
    </div>
  )
}
