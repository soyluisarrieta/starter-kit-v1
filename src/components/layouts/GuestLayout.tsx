import { useAuth } from '@/hooks/useAuth'
import { Redirect } from 'wouter'

export default function GuestLayout ({ children }: ComponentProps): JSX.Element {
  const { isAuth } = useAuth()

  // Redirect if user is authenticated
  if (isAuth) {
    return (
      <Redirect to='/' replace />
    )
  }

  // User is not authenticated
  return (
    <>
      {children}
    </>
  )
}
