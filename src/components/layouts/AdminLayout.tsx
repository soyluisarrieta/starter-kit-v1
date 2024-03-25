import Authenticating from '@/components/pages/Auth/AuthLoader'
import { Button } from '@/components/ui/button'
import Sidebar from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/useAuth'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { HomeIcon, LogOutIcon, Settings2Icon } from 'lucide-react'
import { Redirect, useLocation } from 'wouter'

export default function AdminLayout ({ children }: ComponentProps): JSX.Element {
  const isSessionVerified = useCheckAuth()
  const { isAuth, logout, profile } = useAuth()
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

  // Sidebar menu items
  const sidebar = [
    {
      title: 'Título',
      items: [
        { Icon: HomeIcon, title: 'Inicio', link: '/' },
        { Icon: HomeIcon, title: 'Inicio', link: '/otro' },
        { Icon: HomeIcon, title: 'Inicio', link: '/otro' },
        { Icon: HomeIcon, title: 'Inicio', link: '/otro' }
      ]
    },
    {
      title: 'Título',
      items: [
        { Icon: HomeIcon, title: 'Inicio', link: '/otro' },
        { Icon: HomeIcon, title: 'Inicio', link: '/otro' },
        { Icon: HomeIcon, title: 'Inicio', link: '/otro' },
        { Icon: HomeIcon, title: 'Inicio', link: '/otro' }
      ]
    }
  ]

  // User authenticated
  return (
    <div className='h-screen flex'>
      <Sidebar
        menuItems={sidebar}
        user={profile}
        onLogout={logout}
      />

      <div className='flex-1 overflow-y-auto bg-muted'>
        {children}
      </div>
    </div>
  )
}
