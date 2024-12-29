import { icons } from '@/components/icons/Icons'
import CardIconWidget from '@/components/widgets/CardIconWidget'

export default function DashboardWidget (): JSX.Element {
  return (
    <div>
      <h2 className='text-2xl font-semibold'>Actividades generales</h2>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1 items-center gap-2 py-4'>
        <CardIconWidget
          url='/usuarios'
          title='$143.624'
          description='Tu saldo bancario'
          icon={icons.User}
        />
        <CardIconWidget
          title='1.240'
          description='Transacciones sin categoría'
          icon={icons.Asterisc}
        />
        <CardIconWidget
          title='147'
          description='Empleados trabajan hoy'
          icon={icons.Calendar}
        />
        <CardIconWidget
          title='$3.287,49'
          description='Gasto con tarjeta de esta semana'
          icon={icons.Calendar}
        />
      </div>
    </div>
  )
}
