import DashboardWidget from '@/components/features/dashboard/DashboardWidget'
import Box from '@/components/ui/box'
import CardTrendWidget from '@/components/widgets/CardTrendWidget'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage (): JSX.Element {
  const { profile } = useAuth()
  return (
    <div className='flex gap-4'>
      <main className='container'>
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
              />
              <CardTrendWidget
                title='Ingresos'
                value={{ before: '1000', after: '994' }}
              />
              <CardTrendWidget
                title='Ingresos'
                value={{ before: '1000', after: '894' }}
              />
              <CardTrendWidget
                title='Ingresos'
                value={{ before: '1000', after: '1034' }}
              />
            </div>
          </div>

          <Box variant='solid'>
            <strong className='grow text-2xl font-semibold'>Análisis de pedidos</strong>
          </Box>
        </div>
      </main>

      <div className='w-full xl:max-w-md p-4'>
        <DashboardWidget />
      </div>
    </div>
  )
}
