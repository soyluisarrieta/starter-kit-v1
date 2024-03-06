import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { Link } from 'wouter'

export default function DashboardPage (): JSX.Element {
  const { logout } = useAuth()

  return (
    <div>
      DashboardPage
      <br />
      <Link to='/usuarios'><Button>Usuarios</Button></Link>
      <Button variant='destructive' onClick={logout}>Cerrar sesión</Button>
    </div>
  )
}
