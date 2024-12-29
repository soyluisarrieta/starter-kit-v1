import { useAuth } from '@/hooks/useAuth'
import { Redirect } from 'wouter'

export default function GuestLayout ({ children }: ComponentProps): JSX.Element {
  const { isAuth } = useAuth()
  if (isAuth) return <Redirect to='/' replace /> // Redirect if user is authenticated
  return <>{children}</> // User is not authenticated
}
