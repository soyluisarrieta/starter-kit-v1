import BackButton from '@/components/ui/back-button'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'
import { ComponentType, ReactNode } from 'react'

interface PageLayoutProps  {
  title: string
  description?: string
  withBackButton?: boolean
  createdAt?: string | null
  updatedAt?: string | null
  children: ReactNode
  className?: string

  createForm?: {
    title: string
    description: string
    component: ComponentType
    openButton?: {
      label?: string
      disable?: boolean
    }
  }
}

export default function PageLayout ({
  title,
  description,
  withBackButton,
  className,
  children,
  createForm
}: PageLayoutProps) {

  return (
    <div className='min-h-svh relative flex flex-col flex-1'>
      {/* Header */}
      <header className='container pt-7 pb-5 lg:pb-4 grid grid-cols-[1fr_auto] items-center'>
        {withBackButton && (
          <div className='flex items-center gap-3 order-1'>
            <BackButton className='p-0 text-muted-foreground mb-4' variant='link' />
          </div>
        )}

        <div className={cn(withBackButton ? 'order-3' : 'order-1')}>
          <h1 className='font-semibold text-2xl mb-1'>{title ?? 'Sin título'}</h1>
          {description && <p className='text-muted-foreground'>{description}</p>}
        </div>

        {createForm && !createForm.openButton?.disable && (
          <div className='order-2'>
            <Sheet>
              <SheetTrigger asChild>
                <Button className='text-base text-primary-foreground p-5'>
                  <PlusIcon /> {createForm.openButton?.label ?? 'Añadir'}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{createForm.title}</SheetTitle>
                  {createForm.description && (
                    <SheetDescription>
                      {createForm.description}
                    </SheetDescription>
                  )}
                </SheetHeader>
                <div className='py-2'>
                  {createForm.component && <createForm.component />}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </header>

      {/* Content */}
      <div className={className}>
        {children}
      </div>
    </div>
  )
}
