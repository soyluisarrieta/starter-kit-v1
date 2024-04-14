import { Icon, icons } from '@/components/icons/Icons'
import Authenticating from '@/components/pages/Auth/AuthLoader'
import Sidebar from '@/components/ui/sidebar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/useAuth'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { useThemeStore } from '@/store/ThemeStore'
import { Redirect, useLocation } from 'wouter'

export default function AdminLayout ({ children }: ComponentProps): JSX.Element {
  const isSessionVerified = useCheckAuth()
  const { isAuth, logout, profile } = useAuth()
  const [location] = useLocation()
  const { darkMode, setDarkMode } = useThemeStore()

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
      items: [
        { Icon: icons.Home, title: 'Tablero general', link: '/' },
        { Icon: icons.Home, title: 'Otra opción', link: '/otro' },
        { Icon: icons.Home, title: 'Otra opción', link: '/otro' },
        { Icon: icons.Home, title: 'Otra opción', link: '/otro' }
      ]
    },
    {
      title: 'Título',
      items: [
        { Icon: icons.Home, title: 'Otra opción', link: '/otro' },
        { Icon: icons.Home, title: 'Otra opción', link: '/otro' },
        { Icon: icons.Home, title: 'Otra opción', link: '/otro' },
        { Icon: icons.Home, title: 'Otra opción', link: '/otro' }
      ]
    }
  ]

  // User authenticated
  return (
    <div className='h-dvh flex overflow-hidden'>
      <Sidebar
        menuItems={sidebarItems}
        user={profile}
        onLogout={logout}
      />

      <div className='flex-1 overflow-y-auto bg-background'>
        <header>

          <div className='w-full px-4 flex'>
            <Tabs
              defaultValue={darkMode ? 'dark' : 'light'}
              onValueChange={(theme) => { setDarkMode(theme === 'dark') }}
              asChild
            >
              <TabsList className='h-auto'>
                <TabsTrigger value="light"><Icon element={icons.ThemeMode.Light} /></TabsTrigger>
                <TabsTrigger value="dark"><Icon element={icons.ThemeMode.Dark} /></TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </header>
        {children}
      </div>
    </div>
  )
}
