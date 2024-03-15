import Authenticating from '@/components/pages/Auth/AuthLoader'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { Redirect, useLocation } from 'wouter'

export default function AdminLayout ({ children }: ComponentProps): JSX.Element {
  const isSessionVerified = useCheckAuth()
  const { isAuth, logout } = useAuth()
  const [location] = useLocation()

  // Checking authentication
  if (!isSessionVerified && !isAuth) {
    return <Authenticating />
  }

  // Redirect if user is not authenticated
  if (!isAuth) {
    return (
      <Redirect to='/ingresar' state={{ from: location }} replace />
    )
  }

  // User authenticated
  return (
    <>
      {children}
      <Button variant='destructive' onClick={logout}>
          Cerrar sesión
      </Button>
    </>
  )
}
