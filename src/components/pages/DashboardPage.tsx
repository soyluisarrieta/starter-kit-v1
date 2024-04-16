import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { Link } from 'wouter'

export default function DashboardPage (): JSX.Element {
  const { profile } = useAuth()

  return (
    <div>
      <p className='font-light text-4xl'>¡Hey, {profile?.name}!</p>
      <p className='font-bold text-4xl'>Bienvenido de vuelta</p>

      <div className='w-96 m-5 p-5 border-2 border-zinc-500 rounded bg-zinc-900 text-zinc-100'>
        {profile && Object.entries(profile).map(([key, value]) => (
          <p key={key}>{`${key}: ${value}`}<br /></p>
        ))}
      </div>

      <br />
      <Link to='/usuarios'>
        <Button>Usuarios</Button>
      </Link>
    </div>
  )
}
