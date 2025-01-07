import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { Link } from 'wouter'

export default function ProfilePage (): JSX.Element {
  const { profile } = useAuth()

  return (
    <div className='container'>
      ProfilePage

      <div className='w-96 m-5 p-5 border-2 rounded'>
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
