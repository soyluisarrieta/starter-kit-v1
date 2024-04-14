import { Icon, icons } from '@/components/icons/Icons'
import Authenticating from '@/components/pages/Auth/AuthLoader'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import Sidebar from '@/components/ui/sidebar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useAuth } from '@/hooks/useAuth'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { cn } from '@/lib/utils'
import { useThemeStore } from '@/store/ThemeStore'
import { format } from 'date-fns'
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
    <div className='h-dvh overflow-hidden flex'>
      <Sidebar
        menuItems={sidebarItems}
        user={profile}
        onLogout={logout}
      />

      <div className='w-full h-dvh flex-1 overflow-y-auto flex justify-between items-center'>
        <div className='w-full h-full flex flex-col'>
          <header className='flex items-center py-4 px-6'>
            <Breadcrumb className='h-10 flex items-center'>
              <BreadcrumbList>
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
          </header>
          <div className='h-full'>
            CONTENIDO PRINCIPAL
            {children}
          </div>
        </div>

        <div className='h-full py-4'>
          <Separator orientation='vertical' />
        </div>

        <div className='w-96 h-full flex flex-col'>
          <header className='w-full flex justify-end items-center gap-1 p-4'>
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

            <Button
              variant='outline'
              size='icon'
              className='bg-card border-0 dark:border shadow-sm hover:bg-card hover:shadow-md transition-all duration-200 hover:border-muted-foreground/50 hover:text-muted-foreground'
            >
              <Icon element={icons.Notifications} variant='outline' size={20} />
            </Button>

            <Tooltip delayDuration={0} disableHoverableContent>
              <TooltipTrigger>
                <Button
                  variant='outline'
                  size='icon'
                  className='bg-card border-0 dark:border shadow-sm hover:bg-card hover:shadow-md transition-all duration-200 hover:border-muted-foreground/50 hover:text-muted-foreground'
                >
                  <Icon element={icons.AnaliticPanel} size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className='select-none pointer-events-none text-center' side='top'>
                Panel de<br />analíticas
              </TooltipContent>
            </Tooltip>
          </header>
          <div className='h-full'>
            ANALÍTICAS
          </div>
        </div>
      </div>
    </div>
  )
}
