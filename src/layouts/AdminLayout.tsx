import Authenticating from '@/pages/Auth/AuthLoader'
import { useAuth } from '@/hooks/useAuth'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { SIDEBAR_ITEMS } from '@/constants'
import Sidebar from '@/components/ui/sidebar'
import { Icon, icons } from '@/components/icons/Icons'
import { useSidebarStore } from '@/store/SidebarStore'
import { Navigate, Outlet, useLocation } from 'react-router'

export default function AdminLayout (): JSX.Element {
  const location = useLocation()
  const isSessionVerified = useCheckAuth()
  const { toggleSidebar } = useSidebarStore()
  const { isAuth, logout, profile } = useAuth()

  // Checking authentication
  if (!isSessionVerified && !isAuth) return <Authenticating />

  // Redirect if user is not authenticated
  if (!isAuth) return (
    <Navigate to='/ingresar' state={{ from: location.pathname }} replace />
  )

  // User authenticated
  return (
    <div className='w-dvw h-dvh overflow-x-hidden grid grid-cols-1 lg:grid-cols-[auto_1fr]'>
      <Sidebar
        menuItems={SIDEBAR_ITEMS}
        user={profile}
        onLogout={logout}
      />

      <div className='overflow-x-hidden'>
        {/* Top bar */}
        <header className='w-full p-3 border-b lg:hidden flex justify-between items-center'>
          <button
            className='w-fit h-fit bg-card text-foreground shadow-md dark:shadow-black/30 p-1.5 rounded-full border'
            onClick={toggleSidebar}
          >
            <Icon className='-scale-x-100' element={icons.CaretDouble} />
          </button>
        </header>

        {/* Content */}
        {<Outlet />}
      </div>
    </div>
  )
}
