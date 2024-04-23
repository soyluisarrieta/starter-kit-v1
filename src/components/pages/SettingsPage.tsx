import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Link } from 'wouter'
import { usePathname } from 'wouter/use-browser-location'

export default function SettingsPage ({ children }: ComponentProps): JSX.Element {
  const pathname = usePathname()

  const navItems = [
    { title: 'Generales', path: '/ajustes/generales' },
    { title: 'Mi cuenta', path: '/ajustes/mi-cuenta' }
  ]

  return (
    <main className="relative">
      <ScrollArea className='w-full'>
        <div className={'mb-4 flex items-center'}>
          {navItems.map(({ title, path }, index) => (
            <Link
              href={path}
              key={path}
              className={cn(
                'flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary',
                pathname?.startsWith(path) || (index === 0 && pathname === '/ajustes')
                  ? 'bg-muted font-medium text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {title}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>

      <div className="w-full">
        {children}
      </div>
    </main>
  )
}
