import { Icon, icons } from '@/components/icons/Icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Link } from 'react-router'
import { ASSETS, COPYRIGHT, DOC_URL } from '@/constants'
import { cn } from '@/lib/utils'
import { getYear } from 'date-fns'

interface SidebarFooterProps {
  user: ProfileAuth | null
  isSidebarOpen: boolean
  lgScreen: boolean
  onLogout: () => void
}

export const SidebarFooter = ({ user, isSidebarOpen, lgScreen, onLogout }: SidebarFooterProps): JSX.Element => (
  <div className="flex-grow-0 bg-muted/30 dark:bg-black/10">
    <Separator orientation='horizontal' />

    <div className="w-full flex items-center gap-1 py-4 px-3">
      <DropdownMenu open={isSidebarOpen ? false : undefined}>
        <DropdownMenuTrigger>
          <Avatar className={cn('outline outline-1 outline-muted-foreground/50 dark:outline-muted-foreground outline-offset-2 ml-0.5', !isSidebarOpen && 'cursor-pointer hover:brightness-125')}>
            <AvatarImage src={user?.avatar && `${ASSETS.IMAGES.AVATARS}/${user.avatar}`} />
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
)
