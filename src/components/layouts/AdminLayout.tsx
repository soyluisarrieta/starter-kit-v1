import { Icon, icons } from '@/components/icons/Icons'
import Authenticating from '@/components/pages/Auth/AuthLoader'
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Sidebar from '@/components/ui/sidebar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/useAuth'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { useScreenSize } from '@/hooks/useScreenSize'
import { cn } from '@/lib/utils'
import { buildBreadcrumb } from '@/lib/utils/others'
import { useThemeStore } from '@/store/ThemeStore'
import { format } from 'date-fns'
import { useState } from 'react'
import { PiHouseDuotone } from 'react-icons/pi'
import { Link, Redirect, useLocation } from 'wouter'
import { usePathname } from 'wouter/use-browser-location'
import { SIDEBAR_ITEMS } from '@/constants'

interface Props extends ComponentProps {
  widgets: React.ComponentType | undefined
}

const ITEMS_IN_BREADCRUMB = 3

export default function AdminLayout ({ widgets: Widgets, children }: Props): JSX.Element {
  const [toggleOptions, setToggleOptions] = useState(false)
  const [breadcrumbOpen, setBreadcrumbOpen] = useState(false)

  const isSessionVerified = useCheckAuth()
  const { isAuth, logout, profile } = useAuth()
  const [location] = useLocation()
  const { darkMode, setDarkMode } = useThemeStore()
  const { xlScreen, mdScreen } = useScreenSize()
  const breadcrumbItems = buildBreadcrumb(usePathname())

  // Checking authentication
  if (!isSessionVerified && !isAuth) return <Authenticating />

  // Redirect if user is not authenticated
  if (!isAuth) return (
    <Redirect to='/ingresar' state={{ from: location }} replace />
  )

  // User authenticated
  return (
    <div className='h-dvh overflow-hidden flex'>
      <Sidebar
        menuItems={SIDEBAR_ITEMS}
        user={profile}
        onLogout={logout}
      />

      <div className='w-full h-dvh flex-1 overflow-y-auto flex flex-col justify-between items-center'>
        <header className='w-full flex items-center gap-1 p-4'>
          <Breadcrumb className={cn('max-w-0 transition-[max-width] duration-200 h-10 overflow-hidden flex-1 flex items-center', (!toggleOptions || mdScreen) && 'max-w-full')}>
            <BreadcrumbList className='w-fit flex-nowrap'>
              {Boolean(breadcrumbItems.length) && (
                <>
                  <BreadcrumbItem>
                    <Link to='/'><Icon element={PiHouseDuotone} size={20} /></Link>
                  </BreadcrumbItem>
                  <ul><BreadcrumbSeparator /></ul>
                </>
              )}
              {breadcrumbItems.length > ITEMS_IN_BREADCRUMB
                ? (
                  <>
                    <BreadcrumbItem>
                      <DropdownMenu open={breadcrumbOpen} onOpenChange={setBreadcrumbOpen}>
                        <DropdownMenuTrigger
                          className="flex items-center gap-1"
                          aria-label="Toggle menu"
                        >
                          <BreadcrumbEllipsis className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          {breadcrumbItems.slice(1, -2).map((item, index) => (
                            <DropdownMenuItem key={index}>
                              <Link to={item.href ? item.href : '#'}>
                                {item.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <ul><BreadcrumbSeparator /></ul>
                    </BreadcrumbItem>
                  </>
                )
                : null}
              {breadcrumbItems.slice(-ITEMS_IN_BREADCRUMB + 1).map((item, index) => (
                <BreadcrumbItem key={index}>
                  {item.href
                    ? (
                      <>
                        <BreadcrumbLink
                          asChild
                          className="max-w-20 truncate md:max-w-none"
                        >
                          <Link href={item.href}>{item.label}</Link>
                        </BreadcrumbLink>
                        <ul><BreadcrumbSeparator /></ul>
                      </>
                    )
                    : (
                      <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                        {item.label}
                      </BreadcrumbPage>
                    )}
                </BreadcrumbItem>
              ))}
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

          <div className={cn('w-0 transition-all duration-200 overflow-hidden flex justify-end items-center gap-1', mdScreen ? 'w-fit' : (toggleOptions && 'w-full'))}>
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
              value={darkMode ? 'dark' : 'light'}
              onValueChange={theme => { setDarkMode(theme === 'dark') }}
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
          {Widgets && (
            <div className='w-full xl:max-w-md p-4'>
              <Widgets />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
