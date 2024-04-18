import { icons } from '@/components/icons/Icons'
import CardIconMetric from '@/components/metrics/CardIconMetric'
import ApexChart from '@/components/ui/chart'
import { type ApexOptions } from 'apexcharts'

export default function DashboardMetrics (): JSX.Element {
  const series = [44, 55, 41, 17, 15]

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }]
  }
  return (
    <div className='px-6'>
      <h2 className='text-2xl font-semibold'>Métricas</h2>
      <div className='py-4'>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1 items-center gap-2'>
          <CardIconMetric
            title='$143.624'
            description='Tu saldo bancario'
            icon={icons.User}
          />
          <CardIconMetric
            title='1.240'
            description='Transacciones sin categoría'
            icon={icons.Asterisc}
          />
          <CardIconMetric
            title='147'
            description='Empleados trabajan hoy'
            icon={icons.Calendar}
          />
          <CardIconMetric
            title='$3.287,49'
            description='Gasto con tarjeta de esta semana'
            icon={icons.Calendar}
          />
        </div>

        <ApexChart
          options={chartOptions}
          series={series}
          type="donut"
        />
      </div>
    </div>
  )
}
