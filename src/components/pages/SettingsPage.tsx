import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useScreenSize } from '@/hooks/useScreenSize'
import { cn } from '@/lib/utils'
import { Link } from 'wouter'
import { usePathname } from 'wouter/use-browser-location'

export default function SettingsPage ({ children }: ComponentProps): JSX.Element {
  const pathname = usePathname()
  const { lgScreen } = useScreenSize()

  const navItems = [
    { title: 'Generales', path: '/ajustes/generales' },
    { title: 'Perfil', path: '/ajustes/perfil' }
  ]

  return (
    <main className="relative container grid lg:gap-2" style={{ gridTemplateColumns: lgScreen ? '14rem 1fr' : '1fr' }}>
      <div className='col-span-full'>
        <h1 className='font-semibold text-4xl opacity-90 mb-3'>Ajustes</h1>
        <p className='text-muted-foreground mb-7'>Puedes personalizar diversas configuraciones según tus necesidades y preferencias.</p>
      </div>

      <ScrollArea className='h-fit bg-card/70 rounded-t-md lg:rounded-md lg:py-1'>
        <div className={'mb-3 lg:mb-1 flex lg:flex-col items-center lg:items-start border-b-2 lg:border-b-0'}>
          {navItems.map(({ title, path }, index) => (
            <Link
              href={path}
              key={path}
              className={cn(
                'lg:w-full flex items-center justify-center lg:justify-normal px-4 py-3 from-primary/10 border-b-2 lg:border-b-0 lg:border-r-2 text-center lg:text-start hover:text-primary transition-colors -mb-0.5',
                pathname?.startsWith(path) || (index === 0 && pathname === '/ajustes')
                  ? 'border-primary text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {title}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="w-full min-h-fit lg:col-span-1 bg-card/70 rounded-b-md lg:rounded-md px-6 [&>div]:border-b [&>div:last-child]:border-b-0">
        {children}
      </div>
    </main>
  )
}
