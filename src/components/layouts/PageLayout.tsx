import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { FormStore } from '@/store/FormStore'
import moment from 'moment'
import Box from '@/components/ui/box'
import { cn } from '@/lib/utils'

interface PageLayoutProps extends FormStore {
  children: ReactNode
  className?: string
}

export default function PageLayout (props: PageLayoutProps) {
  const {
    formHeader: { title, description },
    timestamps: { updatedAt },
    isFormModified,
    onSubmitExists,
    onResetForm,
    onSubmit,
    className,
    children
  } = props

  return (
    <div className='min-h-svh relative flex flex-col flex-1'>
      {/* Header */}
      <header className='px-4 lg:px-8 pt-7 pb-5 lg:pb-4'>
        <h1 className='font-semibold text-xl mb-1'>{title ?? 'Sin título'}</h1>
        <p className='text-muted-foreground'>{description}</p>
      </header>

      {/* Content */}
      <div className={className}>
        {children}
      </div>

      {/* Action buttons */}
      {onSubmitExists && (
        <Box
          className={cn(
            'px-4 lg:px-8 border-0 bg-secondary/30 rounded-none backdrop-blur sticky bottom-0',
            !isFormModified && 'static bg-secondary/20'
          )}
          size='sm'
        >
          <div className='flex justify-end items-center'>
            {updatedAt && (
              <div className='h-10 flex flex-col justify-start gap-1 text-xs'>
                <span className='text-muted-foreground'>Última actualización:</span>
                <span className='capitalize font-semibold'>{moment(updatedAt).format('MMM Do YYYY, h:mm A')}</span>
              </div>
            )}
            <div className='flex-grow flex justify-end gap-2 lg:items-center'>
              <Button
                className='disabled:opacity-70'
                onClick={onResetForm}
                disabled={!isFormModified}
                variant={isFormModified ? 'secondary' : 'outline'}
              >
              Cancelar
              </Button>
              {onSubmitExists && (
                <Button
                  className='disabled:opacity-70'
                  onClick={onSubmit}
                  disabled={!isFormModified}
                  variant={isFormModified ? 'default' : 'secondary'}
                >
                  Guardar cambios
                </Button>
              )}
            </div>
          </div>
        </Box>
      )}
    </div>
  )
}
