import { Icons } from '@/components/icons/Icons'
import Authenticating from '@/components/pages/Auth/AuthLoader'
import Sidebar from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/useAuth'
import { useCheckAuth } from '@/hooks/useCheckAuth'
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
  const sidebarItems = [
    {
      title: 'Título',
      items: [
        { Icon: Icons.Home, title: 'Inicio', link: '/' },
        { Icon: Icons.Home, title: 'Inicio', link: '/otro' },
        { Icon: Icons.Home, title: 'Inicio', link: '/otro' },
        { Icon: Icons.Home, title: 'Inicio', link: '/otro' }
      ]
    },
    {
      title: 'Título',
      items: [
        { Icon: Icons.Home, title: 'Inicio', link: '/otro' },
        { Icon: Icons.Home, title: 'Inicio', link: '/otro' },
        { Icon: Icons.Home, title: 'Inicio', link: '/otro' },
        { Icon: Icons.Home, title: 'Inicio', link: '/otro' }
      ]
    }
  ]

  // User authenticated
  return (
    <div className='h-dvh flex overflow-hidden' style={{ backgroundColor: '#f5f5fd' }}>
      <Sidebar
        menuItems={sidebarItems}
        user={profile}
        onLogout={logout}
      />

      <div className='flex-1 overflow-y-auto'>
        {children}
      </div>
    </div>
  )
}
