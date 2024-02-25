import { Button } from '@/components/ui/button'
import { Link } from 'wouter'

export default function UsersPage (): JSX.Element {
  return (
    <div>UsersPage
      <br />
      <Link to='/'><Button>Dashboard</Button></Link>
    </div>
  )
}
