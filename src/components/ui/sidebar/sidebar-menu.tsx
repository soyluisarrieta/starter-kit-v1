import { Icon } from '@/components/icons/Icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { MenuSection } from '@/interfaces/sidebar'
import { cn } from '@/lib/utils'
import { NavLink } from 'react-router'

interface SidebarMenuProps {
  menuItems: MenuSection[]
  isSidebarOpen: boolean
  lgScreen: boolean
  currentLink: string
}

export const SidebarMenu = ({ menuItems, isSidebarOpen, lgScreen, currentLink }: SidebarMenuProps): JSX.Element => (
  <>
    {menuItems.map((section, index) => (
      <div key={index}>
        {section.title && (<h2 className={cn('mb-2 px-2 font-bold text-xs uppercase tracking-widest text-muted-foreground/70 transition-opacity duration-200 relative', lgScreen && !isSidebarOpen && 'left-0 opacity-0')}>{section.title}</h2>)}
        <ul className="space-y-0.5 [&_a.active]:bg-gradient-to-b [&_a.active]:from-primary [&_a.active]:to-primary/80 [&_a.active]:shadow-md [&_a.active]:shadow-black/10 [&_a.active]:text-primary-foreground [&_a.active]:dark:text-primary-foreground [&_a.active]:hover:text-primary-foreground [&_a.active]:opacity-100">
          {section.items.map((item, idx) => (
            <li key={idx}>
              <Tooltip delayDuration={0} disableHoverableContent>
                <TooltipTrigger asChild>
                  <NavLink
                    className={
                      cn('h-10 relative hover:opacity-95 inline-flex items-center justify-center whitespace-nowrap rounded-md hover:bg-accent text-card-foreground/70 dark:text-muted-foreground hover:text-accent-foreground text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2',
                        'w-full')
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
                  </NavLink>
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
  </>
)
