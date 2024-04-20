import ApexChart from '@/components/ui/chart'
import CardTrendWidget from '@/components/widgets/CardTrendWidget'
import { useAuth } from '@/hooks/useAuth'
import { donutOptions } from '@/lib/apex-charts/donutOptions'

export default function DashboardPage (): JSX.Element {
  const { profile } = useAuth()

  const areaSeries = [{
    name: 'BasicAreaChart',
    data: [7, 4, 6, 10, 14, 7, 5, 9, 10, 15, 13, 18]
  }]

  const donutSeries = [44, 55, 41, 17, 15]
  return (
    <main>
      <div className='mb-7'>
        <p className='font-light text-4xl mb-1 opacity-60'>¡Hey, {profile?.name}!</p>
        <p className='font-semibold text-4xl opacity-90'>Bienvenid{profile?.gender_letter} de vuelta</p>
      </div>
      <div className='flex flex-col 2xl:flex-row gap-4'>
        <div className='w-full grid sm:grid-cols-2 gap-4'>
          <CardTrendWidget
            title='Ingresos'
            value={{ before: '1000', after: '1094' }}
            series={areaSeries}
          />
          <CardTrendWidget
            title='Ingresos'
            value={{ before: '1000', after: '994' }}
            series={areaSeries}
          />
          <CardTrendWidget
            title='Ingresos'
            value={{ before: '1000', after: '894' }}
            series={areaSeries}
          />
          <CardTrendWidget
            title='Ingresos'
            value={{ before: '1000', after: '1034' }}
            series={areaSeries}
          />
        </div>
        <div className='shrink-0 bg-card rounded-lg order-3 p-5 flex justify-center overflow-x-auto lg:overflow-hidden'>
          <div className='min-w-fit'>
            <ApexChart
              width='450'
              height='350'
              type="donut"
              series={donutSeries}
              options={donutOptions}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
