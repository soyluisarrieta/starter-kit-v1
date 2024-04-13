import { Icon } from '@/components/icons/Icons'
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
import { HelpCircleIcon, HistoryIcon, SettingsIcon, LogOutIcon, ChevronsLeftIcon } from 'lucide-react'
import { useState } from 'react'
import { type IconType } from 'react-icons/lib'
import { Link } from 'wouter'

interface MenuItem {
  title: string
  link: string
  Icon: {
    solid: IconType
    outline: IconType
  }
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

  return (
    <>
      {!lgScreen && <BackdropBlur className={cn('fixed inset-0 z-10 transition-all duration-200', !isSidebarOpen && 'pointer-events-none')} onClick={() => { isSidebarOpen && toggleSidebar() }} style={{ opacity: isSidebarOpen ? 1 : 0 }} />}

      <aside className={cn('w-10/12 lg:w-72 max-w-72 fixed lg:relative z-10 transition-[width] duration-200', !isSidebarOpen && 'w-0 lg:w-[76px]')}>
        <Button size='icon' className='w-fit h-fit bg-background hover:bg-foreground text-foreground hover:text-background shadow-md p-1 absolute z-10 top-16 right-0 translate-x-1/2 rounded-full active:scale-90' onClick={toggleSidebar}>
          <ChevronsLeftIcon className={cn('transition-transform duration-200', !isSidebarOpen && '-rotate-180')} size={16} />
        </Button>

        <ScrollArea scrollHideDelay={100000} className='w-full h-dvh shadow-inner overflow-y-auto relative' style={{ backgroundColor: '#ececf6' }}>
          <div className='h-dvh min-h-fit flex flex-col'>
            <div className={cn('w-full transition-[width] duration-200 space-y-5 py-4 px-3 flex-1', !isSidebarOpen && 'w-[76px]')}>
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
                  {section.title && (<h2 className={cn('mb-2 px-2 sm:text-md font-semibold tracking-tight transition-opacity duration-200 relative', lgScreen && !isSidebarOpen && 'left-0 opacity-0')}>{section.title}</h2>)}
                  <ul className="space-y-1">
                    {section.items.map((item, idx) => (
                      <li key={idx}>
                        <Tooltip delayDuration={0} disableHoverableContent>
                          <TooltipTrigger asChild>
                            <Link
                              className={
                                cn('h-10 relative opacity-80 hover:opacity-95 inline-flex items-center justify-center whitespace-nowrap rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2',
                                  'w-full', index === 0 && idx === 0 ? 'text-primary opacity-100 before:w-1 before:h-full before:rounded-full before:bg-primary before:absolute before:-left-3' : 'ghost')
                              }
                              to={item.link}
                            >
                              <Icon
                                component={item.Icon}
                                variant='outline'
                                size={18}
                              />
                              <span
                                className={cn('w-full overflow-hidden flex-1', isSidebarOpen ? 'ml-2' : 'opacity-0')}
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

            <div className="flex-grow-0">
              <Separator orientation='horizontal' />

              <div className="w-full flex items-center gap-1 p-4">
                <Tooltip delayDuration={0} disableHoverableContent>
                  <TooltipTrigger asChild>
                    <Link to='/ajustes/perfil'>
                      <Avatar className='outline outline-2 outline-primary outline-offset-2 ml-0.5'>
                        <AvatarImage src={user?.avatar && IMAGES.AVATARS + user.avatar} />
                        <AvatarFallback className='bg-primary text-primary-foreground'>
                          {user?.name[0]}{user?.last_name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className='select-none pointer-events-none ' sideOffset={7}>
                    Perfil
                  </TooltipContent>
                </Tooltip>

                <div className={cn('w-full transition-[width_opacity] duration-200 flex', !isSidebarOpen && 'w-0 opacity-0')}>
                  <div className='flex-1 text-left pl-2 whitespace-nowrap overflow-hidden'>
                    <h2 className="text-base font-semibold -mb-1 text-ellipsis overflow-hidden" title={`${user?.name} ${user?.last_name}`}>
                      {user?.name} {user?.last_name}
                    </h2>
                    <span className="block text-muted-foreground text-ellipsis overflow-hidden" style={{ fontSize: 11 }} title={user?.email}>
                      {user?.email}
                    </span>
                  </div>
                  <Tooltip delayDuration={0} disableHoverableContent>
                    <TooltipTrigger>
                      <Button size='icon' variant='ghost' className='h-auto rounded-full aspect-square opacity-90 hover:opacity-100' to='/ajustes'>
                        <SettingsIcon size={20} strokeWidth={1.5} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className='select-none pointer-events-none'>
                      Preferencias
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <Separator orientation='horizontal' />

              <div className={cn('w-full transition-[width] duration-200 overflow-hidden px-4 flex items-center', !isSidebarOpen && 'w-[76px]', (!lgScreen || isSidebarOpen) && 'gap-2')}>
                <div className={cn('w-full transition-[width] duration-200 overflow-hidden min-w-fit', !isSidebarOpen && 'w-0 min-w-0')}>
                  <div className='min-w-fit py-3 opacity-85 hover:opacity-100 flex gap-2'>
                    <Tooltip delayDuration={0} disableHoverableContent>
                      <TooltipTrigger>
                        <Button variant='outline' size='icon' className="active:opacity-50" to='/historial'>
                          <HistoryIcon className='min-w-fit' size={20} strokeWidth={1.75} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className='select-none pointer-events-none' side='top'>
                        Historial
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={0} disableHoverableContent>
                      <TooltipTrigger asChild>
                        <a href={DOC_URL} target='_blank' rel="noreferrer">
                          <Button variant='outline' size='icon' className="active:opacity-50">
                            <HelpCircleIcon className='min-w-fit' size={20} strokeWidth={1.75} />
                          </Button>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent className='select-none pointer-events-none' side='top'>
                        Ayuda
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <Tooltip delayDuration={0} disableHoverableContent>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      className="w-full"
                      onClick={onLogout}
                    >
                      <LogOutIcon className='min-w-fit' size={20} strokeWidth={1.75} />
                      <span className={cn('w-auto transition-all duration-200 overflow-hidden', !isSidebarOpen ? 'w-0 opacity-0' : 'ml-1')}>Salir</span>
                    </Button>
                  </TooltipTrigger>
                  {!isSidebarOpen && (
                    <TooltipContent className='select-none pointer-events-none ' side='right' sideOffset={22}>
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
      </aside>
    </>
  )
}
