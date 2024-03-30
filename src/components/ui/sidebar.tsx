import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import BackdropBlur from '@/components/ui/backdrop-blur'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { COPYRIGHT, DOC_URL, IMAGES } from '@/constants'
import { useScreenSize } from '@/hooks/useScreenSize'
import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/store/SidebarStore'
import { getYear } from 'date-fns'
import { BellIcon, HelpCircleIcon, type LucideIcon, HistoryIcon, SettingsIcon, LogOutIcon, MenuIcon } from 'lucide-react'
import { Link } from 'wouter'

interface MenuItem {
  title: string
  link: string
  Icon?: LucideIcon
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

      <aside className={cn('w-10/12 lg:w-72 max-w-72 fixed lg:relative z-10 transition-[width] duration-200 overflow-hidden', !isSidebarOpen && 'w-0 lg:w-[76px]')}>
        <ScrollArea className='w-full h-dvh bg-background overflow-y-auto border-r'>
          <div className='h-dvh min-h-fit flex flex-col'>
            <div className='flex-grow-0 py-4 px-2.5 flex items-center'>
              <div className={cn('w-full transition-[width] duration-200', isSidebarOpen ? 'flex-1' : 'w-0 overflow-hidden')}>LOGO</div>
              <Button variant='outline' onClick={toggleSidebar}>
                <MenuIcon />
              </Button>
            </div>

            <div className={cn('w-full transition-[width] duration-200 space-y-5 py-4 px-2.5 flex-1', !isSidebarOpen && 'w-[76px]')}>
              {menuItems.map((section, index) => (
                <div key={index}>
                  {section.title && (<h2 className={cn('mb-2 px-2 sm:text-lg font-semibold tracking-tight transition-opacity duration-200 relative', lgScreen && !isSidebarOpen && 'left-0 opacity-0')}>{section.title}</h2>)}
                  <ul className="space-y-1">
                    {section.items.map((item, idx) => (
                      <li key={idx}>
                        <Button
                          variant={index === 0 && idx === 0 ? 'default' : 'ghost'}
                          className='w-full'
                          to={item.link}
                        >
                          {item.Icon && <item.Icon className='min-w-fit' size={22} strokeWidth={1.5} />}
                          <span className={cn('w-full transition-all duration-200 overflow-hidden flex-1', isSidebarOpen ? 'ml-1' : 'flex-1 opacity-0')}>
                            {item.title}
                          </span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex-grow-0">
              <Separator orientation='horizontal' />

              <div className="w-full flex items-center gap-1 p-4">
                <Link to='/ajustes/perfil'>
                  <Avatar className='outline outline-2 outline-primary outline-offset-2 ml-0.5'>
                    <AvatarImage src={user?.avatar && IMAGES.AVATARS + user.avatar} />
                    <AvatarFallback className='bg-primary text-primary-foreground'>
                      {user?.name[0]}{user?.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                </Link>

                <div className={cn('w-full transition-[width_opacity] duration-200 flex', !isSidebarOpen && 'w-0 opacity-0')}>
                  <div className='flex-1 text-left pl-2 whitespace-nowrap overflow-hidden'>
                    <h2 className="text-base font-semibold -mb-1 text-ellipsis overflow-hidden" title={`${user?.name} ${user?.last_name}`}>
                      {user?.name} {user?.last_name}
                    </h2>
                    <span className="block text-muted-foreground text-ellipsis overflow-hidden" style={{ fontSize: 11 }} title={user?.email}>
                      {user?.email}
                    </span>
                  </div>
                  <Button size='icon' variant='ghost' className='h-auto rounded-full aspect-square opacity-90 hover:opacity-100' to='/ajustes'>
                    <SettingsIcon size={20} strokeWidth={1.5} />
                  </Button>
                </div>
              </div>

              <Separator orientation='horizontal' />

              <div className={cn('w-full transition-[width] duration-200 overflow-hidden px-4 flex items-center', !isSidebarOpen && 'w-[76px]', (!lgScreen || isSidebarOpen) && 'gap-2')}>
                <div className={cn('w-full transition-[width] duration-200 overflow-hidden min-w-fit', !isSidebarOpen && 'w-0 min-w-0')}>
                  <div className='min-w-fit py-3 opacity-85 hover:opacity-100 flex gap-2'>
                    <Button variant='outline' size='icon' className="active:opacity-50">
                      <BellIcon className='min-w-fit' size={20} strokeWidth={1.75} />
                    </Button>
                    <Button variant='outline' size='icon' className="active:opacity-50" to='/historial'>
                      <HistoryIcon className='min-w-fit' size={20} strokeWidth={1.75} />
                    </Button>
                    <a href={DOC_URL} target='_blank' rel="noreferrer">
                      <Button variant='outline' size='icon' className="active:opacity-50">
                        <HelpCircleIcon className='min-w-fit' size={20} strokeWidth={1.75} />
                      </Button>
                    </a>
                  </div>
                </div>
                <Button
                  variant='outline'
                  className="w-full"
                  onClick={onLogout}
                >
                  <LogOutIcon className='min-w-fit' size={20} strokeWidth={1.75} />
                  <span className={cn('w-auto transition-all duration-200 overflow-hidden', !isSidebarOpen ? 'w-0 opacity-0' : 'ml-1')}>Salir</span>
                </Button>
              </div>

              <Separator orientation='horizontal' />

              <div className='flex-grow-0 flex gap-1 text-muted-foreground py-2 px-4 whitespace-nowrap' style={{ fontSize: 11 }}>
                <span>© {getYear(Date())}</span>
                <span className={cn('w-full transition-[width] duration-200 overflow-hidden', !isSidebarOpen && 'w-0')}> - <a className='font-semibold text-muted-foreground hover:underline underline-offset-2' href={COPYRIGHT.URL} target='_blank' rel="noreferrer">{COPYRIGHT.NAME}</a></span>
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}
