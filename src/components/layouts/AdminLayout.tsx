import Authenticating from '@/components/pages/Authenticating'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { Redirect, useLocation } from 'wouter'

export default function AdminLayout ({ children }: ComponentProps): JSX.Element {
  const isSessionVerified = useCheckAuth()
  const { isAuth, logout } = useAuth()
  const [location] = useLocation()

  // Checking authentication
  if (!isAuth && !isSessionVerified) {
    return <Authenticating />
  }

  // Checking if user is not authenticated
  if (!isAuth && isSessionVerified) {
    return (
      <Redirect to='/ingresar' state={{ from: location }} />
    )
  }

  // User authenticated
  return (
    <>
      <h1>AdminLayout</h1>
      {children}
      <Button variant='destructive' onClick={logout}>
          Cerrar sesión
      </Button>
    </>
  )
}
