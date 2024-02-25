import { Button } from '@/components/ui/button'
import { Link } from 'wouter'

export default function DashboardPage (): JSX.Element {
  return (
    <div>
      DashboardPage
      <br />
      <Link to='/usuarios'><Button>Usuarios</Button></Link>
    </div>
  )
}
