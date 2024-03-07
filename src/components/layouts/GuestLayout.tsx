import Authenticating from '@/components/pages/Authenticating'
import { useAuth } from '@/hooks/useAuth'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { Redirect } from 'wouter'

export default function GuestLayout ({ children }: ComponentProps): JSX.Element {
  const isSessionVerified = useCheckAuth()
  const { isAuth } = useAuth()

  // Checking authentication
  if (!isAuth && !isSessionVerified) {
    return <Authenticating />
  }

  // Checking if user is authenticated
  if (isAuth && isSessionVerified) {
    return (
      <Redirect to='/' replace />
    )
  }

  // User is not authenticated
  return (
    <>
      <h1>GuestLayout</h1>
      {children}
    </>
  )
}
