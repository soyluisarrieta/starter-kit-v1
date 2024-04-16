import { Icon, icons } from '@/components/icons/Icons'
import Authenticating from '@/components/pages/auth/AuthLoader'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import Sidebar from '@/components/ui/sidebar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/useAuth'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { useScreenSize } from '@/hooks/useScreenSize'
import { cn } from '@/lib/utils'
import { useThemeStore } from '@/store/ThemeStore'
import { format } from 'date-fns'
import { useState } from 'react'
import { Redirect, useLocation } from 'wouter'

interface Props extends ComponentProps {
  metricsPanel: React.ComponentType | undefined
}

export default function AdminLayout ({ metricsPanel: MetricsPanel, children }: Props): JSX.Element {
  const [toggleOptions, setToggleOptions] = useState(false)

  const isSessionVerified = useCheckAuth()
  const { isAuth, logout, profile } = useAuth()
  const [location] = useLocation()
  const { darkMode, setDarkMode } = useThemeStore()
  const { xlScreen, mdScreen } = useScreenSize()

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
    <div className='h-dvh overflow-hidden flex'>
      <Sidebar
        menuItems={sidebarItems}
        user={profile}
        onLogout={logout}
      />

      <div className='w-full h-dvh flex-1 overflow-y-auto flex flex-col justify-between items-center'>
        <header className='w-full flex items-center gap-1 p-4'>
          <Breadcrumb className={cn('max-w-0 transition-[max-width] duration-300 h-10 overflow-hidden flex-1 flex items-center', (!toggleOptions || mdScreen) && 'max-w-full')}>
            <BreadcrumbList className='w-fit flex-nowrap'>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {!mdScreen && (
            <Button
              variant='ghost'
              size='icon'
              onClick={() => { setToggleOptions(!toggleOptions) }}
            >
              <Icon element={icons.DotsVertical} size={20} />
            </Button>
          )}

          <div className={cn('w-0 transition-all duration-300 overflow-hidden flex justify-end items-center gap-1', mdScreen ? 'w-fit' : (toggleOptions && 'w-full'))}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant='ghost'
                  size="sm"
                  className='px-4 justify-start text-left text-foreground/80 hover:text-foreground font-normal hover:bg-muted'
                >
                  <Icon element={icons.Calendar} className="mr-2 h-4 w-4" />
                  {format(new Date(), 'LLL dd, y')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar selected={new Date()} />
              </PopoverContent>
            </Popover>

            <Tabs
              defaultValue={darkMode ? 'dark' : 'light'}
              onValueChange={(theme) => { setDarkMode(theme === 'dark') }}
              className='bg-card shadow-sm border'
              asChild
            >
              <TabsList>
                <TabsTrigger className='h-full' value="light"><Icon size={18} element={icons.ThemeMode.Light} /></TabsTrigger>
                <TabsTrigger className='h-full' value="dark"><Icon size={18} element={icons.ThemeMode.Dark} /></TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className='min-w-fit'>
            <Button
              variant='outline'
              size='icon'
              className='bg-card border-0 dark:border shadow-sm hover:bg-card hover:shadow-md transition-all duration-200 hover:border-muted-foreground/50 hover:text-muted-foreground'
            >
              <Icon element={icons.Notifications} variant='outline' size={20} />
            </Button>
          </div>
        </header>

        <div className={cn('w-full h-full flex flex-col', xlScreen && ' flex-row')}>
          <div className={cn('w-full p-4 order-last', xlScreen && 'order-first')}>
            {children}
          </div>
          {MetricsPanel && (
            <>
              <Separator orientation={xlScreen ? 'vertical' : 'horizontal'} />
              <div className='w-full xl:max-w-lg p-4'>
                <MetricsPanel />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
