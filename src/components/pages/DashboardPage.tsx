import ApexChart from '@/components/ui/chart'
import { useAuth } from '@/hooks/useAuth'
import { type ApexOptions } from 'apexcharts'

export default function DashboardPage (): JSX.Element {
  const { profile } = useAuth()

  const series = [44, 55, 41, 17, 15]

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut'
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%'
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
        vertical: 5
      },
      formatter (legendName) {
        return `<span class="text-muted-foreground text-xl ml-1 pr-10">${legendName}<span>`
      },
      offsetY: 20
    }
  }

  return (
    <main>
      <div className='mb-7'>
        <p className='font-light text-4xl mb-1 opacity-60'>¡Hey, {profile?.name}!</p>
        <p className='font-semibold text-4xl opacity-90'>Bienvenid{profile?.gender_letter} de vuelta</p>
      </div>
      <div className='w-full grid grid-cols-12 grid-rows-2 gap-4'>
        <div className='col-span-3 row-span-1 bg-card rounded-lg'>CARD</div>
        <div className='col-span-3 row-span-1 bg-card rounded-lg'>CARD</div>
        <div className='col-span-3 row-span-1 bg-card rounded-lg order-5'>CARD</div>
        <div className='col-span-3 row-span-1 bg-card rounded-lg order-5'>CARD</div>
        <div className='col-span-6 row-span-2 bg-card rounded-lg order-3 p-5'>
          <ApexChart
            height='350rem'
            options={chartOptions}
            series={series}
            type="donut"
          />
        </div>
      </div>
    </main>
  )
}
