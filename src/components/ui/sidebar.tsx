import { Icon, icons } from '@/components/icons/Icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import BackdropBlur from '@/components/ui/backdrop-blur'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { COPYRIGHT, DOC_URL, IMAGES } from '@/constants'
import { useScreenSize } from '@/hooks/useScreenSize'
import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/store/SidebarStore'
import { getYear } from 'date-fns'
import { Link } from 'wouter'
import { type IconType } from 'react-icons/lib'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu'
import { useEffect } from 'react'

interface MenuItem {
  title: string
  link: string
  Icon: IconType
}

interface MenuSection {
  title?: string
  items: MenuItem[]
}

interface SidebarProps {
  menuItems: MenuSection[]
  user: ProfileAuth | null
  onLogout: () => void
}

export default function Sidebar ({ menuItems, user, onLogout }: SidebarProps): JSX.Element {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore()
  const { lgScreen } = useScreenSize()

  const currentLink = location.pathname

  // Close sidebar when screen is small
  useEffect(() => {
    if (!lgScreen && isSidebarOpen) toggleSidebar()
  }, [lgScreen])

  return (
    <>
      {!lgScreen && <BackdropBlur className={cn('fixed inset-0 z-40 transition-all duration-200', !isSidebarOpen && 'pointer-events-none')} onClick={() => { isSidebarOpen && toggleSidebar() }} style={{ opacity: isSidebarOpen ? 1 : 0 }} />}

      <aside className={cn('w-10/12 lg:w-72 max-w-72 fixed lg:relative z-40 transition-[width] duration-200 bg-background', !isSidebarOpen && 'w-0 lg:w-[76px]')}>
        <Button size='icon' className='w-fit h-fit bg-card hover:bg-foreground text-foreground hover:text-background shadow-md dark:shadow-black/70 p-1.5 absolute z-10 top-6 lg:top-14 -right-4 lg:right-0 translate-x-3/4 lg:translate-x-1/2 rounded-full active:scale-90 border' onClick={toggleSidebar}>
          <Icon element={icons.CaretDouble} className={cn('transition-transform duration-200', !isSidebarOpen && '-rotate-180')} size={84} />
        </Button>

        <ScrollArea className='w-full h-dvh relative bg-card dark:bg-muted border-r'>
          <div className='h-dvh min-h-fit flex flex-col'>
            <div className={cn('w-full transition-[width] duration-200 space-y-5 py-4 px-2 flex-1', !isSidebarOpen && 'w-[76px]')}>
              <Link to='/' asChild>
                <div className='w-fit h-12 flex items-center cursor-pointer transition-transform active:scale-95 hover:opacity-85'>
                  <div className={cn('h-full flex justify-center items-center flex-shrink-0 ml-0.5')}>
                    <svg className='h-full cursor-pointer' fill='none' viewBox='0 0 32 32'>
                      <path
                        clipRule='evenodd'
                        d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
                        fill='currentColor'
                        fillRule='evenodd'
                      />
                    </svg>
                  </div>
                  <div className={cn('transition-all duration-200 overflow-hidden font-semibold text-xl select-none', !isSidebarOpen && lgScreen && 'opacity-0')}>
                    ACME
                  </div>
                </div>
              </Link>

              {menuItems.map((section, index) => (
                <div key={index}>
                  {section.title && (<h2 className={cn('mb-2 px-2 font-bold text-xs uppercase tracking-widest text-muted-foreground/70 transition-opacity duration-200 relative', lgScreen && !isSidebarOpen && 'left-0 opacity-0')}>{section.title}</h2>)}
                  <ul className="space-y-0.5">
                    {section.items.map((item, idx) => (
                      <li key={idx}>
                        <Tooltip delayDuration={0} disableHoverableContent>
                          <TooltipTrigger asChild>
                            <Link
                              className={
                                cn('h-10 relative hover:opacity-95 inline-flex items-center justify-center whitespace-nowrap rounded-md hover:bg-muted-foreground/10 text-muted-foreground dark:text-muted-foreground hover:text-card-foreground/70 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2',
                                  'w-full', currentLink === item.link ? 'bg-gradient-to-b from-primary to-primary/80 shadow-md shadow-black/10 text-primary-foreground dark:text-primary-foreground hover:text-primary-foreground opacity-100' : 'ghost')
                              }
                              to={item.link}
                            >
                              <Icon
                                className='min-w-[28px]'
                                element={item.Icon}
                                variant='outline'
                                strokeWidth={currentLink === item.link ? 1.5 : 1}
                                size={20}
                              />
                              <span
                                className={cn('w-full overflow-hidden flex-1 font-medium', isSidebarOpen ? 'ml-1' : 'opacity-0')}
                                style={{ transition: 'opacity 200ms ease, margin 200ms ease' }}
                              >
                                {item.title}
                              </span>
                            </Link>
                          </TooltipTrigger>
                          {!isSidebarOpen && (
                            <TooltipContent className='select-none pointer-events-none' side='right' sideOffset={16}>
                              {item.title}
                            </TooltipContent>)}
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex-grow-0 bg-muted/30 dark:bg-black/10">
              <Separator orientation='horizontal' />

              <div className="w-full flex items-center gap-1 py-4 px-3">
                <DropdownMenu open={isSidebarOpen ? false : undefined}>
                  <DropdownMenuTrigger>
                    <Avatar className={cn('outline outline-1 outline-muted-foreground/50 dark:outline-muted-foreground outline-offset-2 ml-0.5', !isSidebarOpen && 'cursor-pointer hover:brightness-125')}>
                      <AvatarImage src={user?.avatar && IMAGES.AVATARS + user.avatar} />
                      <AvatarFallback className='bg-muted-foreground/30 dark:bg-muted-foreground/40 text-card-foreground/40 dark:text-muted-foreground'>
                        {user?.name[0]}{user?.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-52 mb-2' sideOffset={24} side='right' align='start'>
                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='cursor-pointer' asChild>
                      <Link className='flex' to='/perfil'><Icon size={16} element={icons.User} />Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' asChild>
                      <Link className='flex' to='/ajustes'><Icon size={16} element={icons.Settings} />Ajustes</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='cursor-pointer' asChild>
                      <Link className='flex' to='/actualizaciones'><Icon size={16} element={icons.ChangeLog} />Actualizaciones</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' asChild>
                      <Link className='flex' to='/historial'><Icon size={16} element={icons.Historical} />Historial</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' asChild>
                      <a className='flex' href={DOC_URL} target='_blank' rel="noreferrer">
                        <Icon size={16} element={icons.Help} className='mr-2' />Ayuda
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuArrow className='fill-popover' />
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className={cn('w-full transition-[width_opacity] duration-200 flex', !isSidebarOpen && 'w-0 opacity-0')}>
                  <div className='flex-1 text-left pl-2 whitespace-nowrap overflow-hidden'>
                    <h2 className="text-base font-semibold -mb-1 text-ellipsis overflow-hidden" title='Mi perfil'>
                      <Link to='/perfil'>
                        {user?.name} {user?.last_name}
                      </Link>
                    </h2>
                    <span className="block text-muted-foreground text-ellipsis overflow-hidden" style={{ fontSize: 11 }} title={user?.email}>
                      {user?.email}
                    </span>
                  </div>
                  <Tooltip delayDuration={0} disableHoverableContent>
                    <TooltipTrigger>
                      <Button size='icon' variant='ghost' className='h-auto rounded-full aspect-square opacity-90 hover:opacity-100' to='/ajustes'>
                        <Icon element={icons.Settings} size={20} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className='select-none pointer-events-none'>
                      Ajustes
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <Separator orientation='horizontal' />

              <div className={cn('w-full transition-[width] duration-200 overflow-hidden px-3 flex items-center', !isSidebarOpen && 'w-[76px]', (!lgScreen || isSidebarOpen) && 'gap-2')}>
                <div className={cn('w-full transition-[width] duration-200 min-w-fit', !isSidebarOpen && 'w-0 min-w-0 overflow-hidden')}>
                  <div className='min-w-fit py-3 opacity-90 hover:opacity-100 flex gap-2'>
                    <Tooltip delayDuration={0} disableHoverableContent>
                      <TooltipTrigger>
                        <Button variant='outline' size='icon' className="dark:bg-muted active:opacity-50" to='/actualizaciones'>
                          <Icon element={icons.ChangeLog} className='min-w-fit' size={20} strokeWidth={1.6} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className='select-none pointer-events-none' side='top'>
                        Actualizaciones
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={0} disableHoverableContent>
                      <TooltipTrigger>
                        <Button variant='outline' size='icon' className="dark:bg-muted active:opacity-50" to='/historial'>
                          <Icon element={icons.Historical} className='min-w-fit' size={20} strokeWidth={1.6} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className='select-none pointer-events-none' side='top'>
                        Historial
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={0} disableHoverableContent>
                      <TooltipTrigger asChild>
                        <a href={DOC_URL} target='_blank' rel="noreferrer">
                          <Button variant='outline' size='icon' className="dark:bg-muted active:opacity-50">
                            <Icon element={icons.Help} className='min-w-fit' size={20} strokeWidth={1.6} />
                          </Button>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent className='select-none pointer-events-none' side='top'>
                        Centro de ayuda
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <Tooltip delayDuration={0} disableHoverableContent>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      className="w-full gap-0 dark:bg-muted"
                      onClick={onLogout}
                    >
                      <Icon element={icons.Logout} className='min-w-fit text-red-500 dark:text-red-400' size={20} strokeWidth={1.7} />
                      <span className={cn('w-auto transition-all duration-200 overflow-hidden', !isSidebarOpen ? 'w-0 opacity-0' : 'ml-1.5')}>Salir</span>
                    </Button>
                  </TooltipTrigger>
                  {!isSidebarOpen && (
                    <TooltipContent className='select-none pointer-events-none' side='right' sideOffset={22}>
                      Salir
                    </TooltipContent>)}
                </Tooltip>
              </div>

              <Separator orientation='horizontal' />

              <div className='flex-grow-0 flex gap-1 text-muted-foreground py-2 px-4 whitespace-nowrap' style={{ fontSize: 11 }}>
                <span>© {getYear(Date())}</span>
                <span className={cn('w-full transition-all duration-200 overflow-hidden', !isSidebarOpen && 'w-0')}> - <a className='font-semibold text-muted-foreground hover:underline underline-offset-2' href={COPYRIGHT.URL} target='_blank' rel="noreferrer">{COPYRIGHT.NAME}</a></span>
              </div>
            </div>
          </div>
        </ScrollArea>
        <button
          className="absolute right-0 inset-y-0 hidden w-2 translate-x-1 transition-all ease-linear sm:flex cursor-w-resize"
          onClick={toggleSidebar}
        />
      </aside>
    </>
  )
}
