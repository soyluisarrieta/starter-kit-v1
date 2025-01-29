import { Icon, icons } from '@/components/icons/Icons'
import BackdropBlur from '@/components/ui/backdrop-blur'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarFooter } from '@/components/ui/sidebar/sidebar-footer'
import { SidebarHeader } from '@/components/ui/sidebar/sidebar-header'
import { SidebarMenu } from '@/components/ui/sidebar/sidebar-menu'
import { useScreenSize } from '@/hooks/useScreenSize'
import { MenuSection } from '@/interfaces/sidebar'
import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/store/SidebarStore'
import { useEffect } from 'react'

export interface SidebarProps {
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
        {(isSidebarOpen || lgScreen) && (
          <Button
            className='w-fit h-fit bg-card hover:bg-muted dark:bg-card hover:dark:bg-secondary text-foreground shadow-md dark:shadow-black/70 p-1.5 absolute z-10 top-4 lg:top-14 -right-4 lg:right-0 translate-x-3/4 lg:translate-x-1/2 rounded-full active:scale-90 border'
            size='icon'
            onClick={toggleSidebar}>
            <Icon element={icons.CaretDouble} className={cn('transition-transform duration-200', !isSidebarOpen && '-rotate-180')} size={84} />
          </Button>
        )}

        <ScrollArea className='w-full h-dvh relative bg-card/90 dark:bg-muted border-r'>
          <div className='h-dvh min-h-fit flex flex-col'>
            <div className={cn('w-full transition-[width] duration-200 space-y-5 py-4 px-2 flex-1', !isSidebarOpen && 'w-[76px]')}>
              <SidebarHeader isSidebarOpen={isSidebarOpen} lgScreen={lgScreen} />
              <SidebarMenu menuItems={menuItems} isSidebarOpen={isSidebarOpen} lgScreen={lgScreen} currentLink={currentLink} />
            </div>
            <SidebarFooter user={user} isSidebarOpen={isSidebarOpen} lgScreen={lgScreen} onLogout={onLogout} />
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
