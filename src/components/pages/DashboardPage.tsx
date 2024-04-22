import ApexChart from '@/components/ui/chart'
import CardTrendWidget from '@/components/widgets/CardTrendWidget'
import { useAuth } from '@/hooks/useAuth'
import { type ApexOptions } from 'apexcharts'

export default function DashboardPage (): JSX.Element {
  const { profile } = useAuth()

  const series = [{
    name: 'Sales1',
    data: [7, 5, 4, 3, 10, 9, 29, 19, 22, 9, 12]
  }, {
    name: 'Sales2',
    data: [9, 2, 7, 9, 5, 13, 9, 17, 2, 7, 5]
  }]

  const areaSeries = [{
    name: 'BasicAreaChart',
    data: [7, 4, 6, 10, 14, 7, 5, 9, 10, 15, 13, 18]
  }]

  const donutSeries = [44, 55, 41, 17, 15]
  const donutOptions: ApexOptions = {
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

  const lineOptions: ApexOptions = {
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
      categories: ['8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'],
      labels: {
        style: { colors: 'hsl(var(--muted-foreground))' },
        formatter: function (_, timestamp, opts) {
          if (timestamp !== undefined) {
            return opts.dateFormatter(new Date(timestamp), 'dd MMM')
          }
        }
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
  return (
    <main>
      <div className='mb-7'>
        <p className='font-light text-4xl mb-1 opacity-60'>¡Hey, {profile?.name}!</p>
        <p className='font-semibold text-4xl opacity-90'>Bienvenid{profile?.gender_letter} de vuelta</p>
      </div>
      <div className='grid gap-5'>
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
          <div className='bg-card rounded-lg order-3 p-5 flex justify-center items-center overflow-x-auto lg:overflow-hidden' style={{ minWidth: '30rem' }}>
            <ApexChart
              width='430'
              height='350'
              type="donut"
              series={donutSeries}
              options={donutOptions}
            />
          </div>
        </div>

        <div className='w-full p-5 bg-card rounded-lg overflow-hidden'>
          <div className='w-full max-w-full animate-in'>
            <strong className='grow text-2xl font-semibold'>Análisis de pedidos</strong>
            <ApexChart
              options={lineOptions}
              series={series}
              type="line"
              width='100%'
              height={300}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
