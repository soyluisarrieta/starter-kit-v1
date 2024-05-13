import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useScreenSize } from '@/hooks/useScreenSize'
import { cn } from '@/lib/utils'
import { useFormStore } from '@/store/FormStore'
import { Link } from 'wouter'
import { usePathname } from 'wouter/use-browser-location'
import moment from 'moment'

export default function SettingsPage ({ children }: ComponentProps): JSX.Element {
  const pathname = usePathname()
  const { lgScreen } = useScreenSize()
  const {
    formHeader,
    onSubmitExists,
    isFormModified,
    timestamps,
    onSubmit,
    onResetForm
  } = useFormStore()
  const navItems = [
    { title: 'Generales', path: '/ajustes/generales' },
    { title: 'Perfil', path: '/ajustes/perfil' }
  ]

  return (
    <main className="relative p-0 grid lg:gap-2" style={{ gridTemplateColumns: lgScreen ? '18rem 1fr' : '1fr' }}>
      <div className='col-span-full'>
        <h1 className='font-semibold text-4xl opacity-90 mb-3'>{formHeader?.title}</h1>
        <p className='text-muted-foreground mb-4'>{formHeader?.description}</p>
      </div>

      {!lgScreen && timestamps && (
        <div className='grid sm:grid-cols-[auto_1fr] gap-2 sm:gap-5 whitespace-nowrap border-t lg:border-0 py-4 lg:pb-0 text-sm'>
          {timestamps.updatedAt && (
            <div className='h-10 flex justify-between sm:justify-start items-center gap-2'>
              <span className='text-muted-foreground'>Última actualización:</span>
              <span className='capitalize font-semibold'>{moment(timestamps.updatedAt).format('MMM Do YYYY, h:mm A')}</span>
            </div>
          )}
        </div>
      )}

      {(lgScreen || isFormModified || onSubmitExists) && (
        <div className='col-span-full bg-background border-y sticky top-0 z-20 py-4 flex flex-col lg:flex-row justify-between lg:items-center'>
          {lgScreen && (
            <div className='flex-1 grid sm:grid-cols-[auto_1fr] gap-2 sm:gap-5 whitespace-nowrap border-b lg:border-0 pb-6 lg:pb-0 text-sm'>
              {timestamps.updatedAt && (
                <div className='h-10 flex justify-start items-center gap-2'>
                  <span className='text-muted-foreground'>Última actualización:</span>
                  <span className='capitalize font-semibold'>{moment(timestamps.updatedAt).format('MMM Do YYYY, h:mm A')}</span>
                </div>
              )}
            </div>
          )}
          <div className='space-x-2 pt-0'>
            {isFormModified && (
              <Button
                onClick={onResetForm}
                variant='outline'
              >
                Reiniciar
              </Button>)}
            {onSubmitExists && (
              <Button
                onClick={onSubmit}
                disabled={!isFormModified}
                variant='default'
              >
                {isFormModified ? 'Guardar' : 'Sin modificar'}
              </Button>
            )}
          </div>
        </div>
      )}

      <ScrollArea className='h-fit'>
        <div className={'flex lg:flex-col items-center lg:items-start border-b-2 lg:border-b-0'}>
          {navItems.map(({ title, path }, index) => (
            <Link
              href={path}
              key={path}
              className={cn(
                'lg:w-full flex items-center justify-center lg:justify-normal px-4 py-3 border-b-2 lg:border-b-0 lg:border-r-2 text-center lg:text-start hover:text-primary transition-colors -mb-0.5',
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

      <div className="w-full min-h-fit lg:col-span-1 bg-card/70 rounded-b-md lg:rounded-md">
        {children}
      </div>
    </main>
  )
}
