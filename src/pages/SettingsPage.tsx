import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import PageLayout from '@/layouts/PageLayout'
import { Separator } from '@/components/ui/separator'
import { Link, useLocation, Outlet } from 'react-router'

export default function SettingsPage (): JSX.Element {
  const { pathname } = useLocation()

  const navItems = [
    { title: 'Generales', path: '/ajustes/generales' },
    { title: 'Perfil', path: '/ajustes/perfil' }
  ]

  return (
    <PageLayout
      className='flex-1'
      title='Ajustes'
      description='Configura tu cuenta y preferencias'
    >
      <ScrollArea>
        <div className='container px-4 lg:px-6 flex items-center mb-2 select-none'>
          {navItems.map(({ title, path }, index) => (
            <Link
              to={path}
              key={path}
              className={cn(
                'flex items-center justify-center px-4 mr-4 py-3 border-b-2 border-transparent hover:border-secondary text-center text-foreground/90 hover:text-foreground transition-colors',
                (pathname?.startsWith(path) || (index === 0 && pathname === '/ajustes')) && 'border-primary hover:border-primary'
              )}
            >
              {title}
            </Link>
          ))}
        </div>
        <ScrollBar className='h-2' orientation="horizontal" />
      </ScrollArea>
      <Separator className='-mt-2' />

      <main className="w-full flex-1 flex flex-col">
        <Outlet />
      </main>
    </PageLayout>
  )
}
