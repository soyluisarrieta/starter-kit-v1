import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { COPYRIGHT, DOC_URL, IMAGES } from '@/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { getYear } from 'date-fns'
import { BellIcon, HelpCircleIcon, type LucideIcon, HistoryIcon, SettingsIcon, LogOutIcon } from 'lucide-react'
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
  className?: string
  menuItems: MenuSection[]
  user: ProfileAuth | null
  onLogout: () => void
}

export default function Sidebar ({ className, menuItems, user, onLogout }: SidebarProps): JSX.Element {
  return (
    <ScrollArea className={cn('h-screen overflow-y-auto border-r', className)} style={{ maxWidth: 270 }}>
      <div className='h-screen min-h-fit flex flex-col '>
        <div className='flex-grow-0 py-4 px-6'>
          LOGO
        </div>

        <div className="space-y-5 py-4 flex-1">
          {menuItems.map((section, index) => (
            <div key={index} className="px-4">
              {section.title && (<h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">{section.title}</h2>)}
              <div className="space-y-1">
                {section.items.map((item, idx) => (
                  <Button
                    key={idx}
                    variant={index === 0 && idx === 0 ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    to={item.link}
                  >
                    {item.Icon && <item.Icon size={16} strokeWidth={1.75} className="mr-2" />}
                    {item.title}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex-grow-0">
          <Separator orientation='horizontal' />

          <div className="w-full flex items-center gap-1 p-4">
            <Link to='/ajustes/perfil'>
              <Avatar>
                <AvatarImage src={user?.avatar && IMAGES.AVATARS + user.avatar} />
                <AvatarFallback className='bg-primary text-primary-foreground'>
                  {user?.name[0]}{user?.last_name[0]}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className='flex-1 text-left pl-1 whitespace-nowrap overflow-hidden'>
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

          <Separator orientation='horizontal' />

          <div className="flex-grow-0 px-4">
            <ul className="w-full flex items-center justify-between py-3 opacity-85 hover:opacity-100">
              <li>
                <Button variant='outline' size='icon' className="focus:outline-none focus:ring-2 focus:ring-gray-300">
                  <BellIcon size={20} strokeWidth={1.75} />
                </Button>
              </li>
              <li>
                <Button variant='outline' size='icon' className="focus:outline-none focus:ring-2 focus:ring-gray-300" to='/historial'>
                  <HistoryIcon size={20} strokeWidth={1.75} />
                </Button>
              </li>
              <li>
                <a href={DOC_URL} target='_blank' rel="noreferrer">
                  <Button variant='outline' size='icon' className="focus:outline-none focus:ring-2 focus:ring-gray-300">
                    <HelpCircleIcon size={20} strokeWidth={1.75} />
                  </Button>
                </a>
              </li>
              <li>
                <Button variant='outline' className="focus:outline-none focus:ring-2 focus:ring-gray-300" onClick={onLogout}>
                  <LogOutIcon className='mr-2' size={20} strokeWidth={1.75} />
                  Salir
                </Button>
              </li>
            </ul>
          </div>

          <Separator orientation='horizontal' />

          <div className='flex-grow-0 text-muted-foreground py-3 px-4' style={{ fontSize: 11 }}>
            © {getYear(Date())} - <a className='text-xs font-semibold text-muted-foreground hover:underline underline-offset-2' href={COPYRIGHT.URL} target='_blank' rel="noreferrer">{COPYRIGHT.NAME}</a>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
