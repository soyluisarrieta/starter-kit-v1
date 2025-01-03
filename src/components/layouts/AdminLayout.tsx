import Authenticating from '@/components/pages/Auth/AuthLoader'
import { useAuth } from '@/hooks/useAuth'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { useScreenSize } from '@/hooks/useScreenSize'
import { cn } from '@/lib/utils'
import { SIDEBAR_ITEMS } from '@/constants'
import { Redirect } from 'wouter'
import Sidebar from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Icon, icons } from '@/components/icons/Icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSidebarStore } from '@/store/SidebarStore'

interface Props extends ComponentProps {
  widgets: React.ComponentType | undefined
}

export default function AdminLayout ({ widgets: Widgets, children }: Props): JSX.Element {
  const isSessionVerified = useCheckAuth()
  const { toggleSidebar } = useSidebarStore()
  const { isAuth, logout, profile } = useAuth()
  const { xlScreen } = useScreenSize()

  // Checking authentication
  if (!isSessionVerified && !isAuth) return <Authenticating />

  // Redirect if user is not authenticated
  if (!isAuth) return (
    <Redirect to='/ingresar' state={{ from: location }} replace />
  )

  // User authenticated
  return (
    <div className='w-dvw flex'>
      <Sidebar
        menuItems={SIDEBAR_ITEMS}
        user={profile}
        onLogout={logout}
      />

      <ScrollArea className='w-full h-dvh flex-1 flex flex-col justify-between items-center relative'>
        <div className={cn('w-full h-full flex flex-col', xlScreen && ' flex-row')}>

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
          <div className={cn('w-full order-last', xlScreen && 'order-first')}>
            {children}
          </div>

          {/* Widgets */}
          {Widgets && (
            <div className='w-full xl:max-w-md p-4'>
              <Widgets />
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
