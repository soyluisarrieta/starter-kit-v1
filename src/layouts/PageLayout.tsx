import BackButton from '@/components/ui/back-button'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { ChartColumnBigIcon } from 'lucide-react'
import { ComponentType, ReactNode, useState } from 'react'

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
    component: ComponentType<{ callback?: (formData: any) => void }>
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
  const [openCreateForm, setOpenCreateForm] = useState(false)

  return (
    <div className='relative flex flex-col flex-1'>
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

        <div className='order-2'>
          <Button
            className='text-base p-5'
            variant='secondary'
            onClick={() => setOpenCreateForm(true)}
          >
            <ChartColumnBigIcon/> Métricas
          </Button>
          {createForm && !createForm.openButton?.disable && (
            <Sheet open={openCreateForm} onOpenChange={setOpenCreateForm}>
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
                  {createForm.component && <createForm.component callback={() => { setOpenCreateForm(false)}} />}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </header>

      {/* Content */}
      <div className={className}>
        {children}
      </div>
    </div>
  )
}
