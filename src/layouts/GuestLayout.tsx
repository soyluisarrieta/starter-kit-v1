import { useAuth } from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router'

export default function GuestLayout (): JSX.Element {
  const { isAuth } = useAuth()
  // Redirect if user is authenticated
  if (isAuth) return <Navigate to='/' replace />

  // User is not authenticated
  return <Outlet />
}
