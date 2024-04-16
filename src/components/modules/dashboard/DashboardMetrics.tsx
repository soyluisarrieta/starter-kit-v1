import { icons } from '@/components/icons/Icons'
import CardIconMetric from '@/components/metrics/CardIconMetric'

export default function DashboardMetrics (): JSX.Element {
  return (
    <div>
      <h2>Métricas</h2>
      <div className='py-4'>
        <h3>Subtitulo</h3>
        <div className='flex flex-col gap-4'>
          <CardIconMetric
            title='Card titile 1'
            description='Lorem ipsum dolor sit amet.'
            icon={icons.User}
          />
          <CardIconMetric
            title='Card titile 2'
            description='Lorem ipsum dolor sit amet.'
            icon={icons.Asterisc}
          />
          <CardIconMetric
            title='Card titile 3'
            description='Lorem ipsum dolor sit amet.'
            icon={icons.Calendar}
          />
        </div>
      </div>
    </div>
  )
}
