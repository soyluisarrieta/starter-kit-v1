import BackButton from '@/components/ui/back-button'
import { ReactNode } from 'react'

interface PageLayoutProps  {
  title: string
  description?: string
  withBackButton?: boolean
  createdAt?: string | null
  updatedAt?: string | null
  disableActionButtons?: boolean
  children: ReactNode
  className?: string
}

export default function PageLayout ({ title, description, withBackButton, className, children }: PageLayoutProps) {
  return (
    <div className='min-h-svh relative flex flex-col flex-1'>
      {/* Header */}
      <header className='px-4 lg:px-8 pt-7 pb-5 lg:pb-4'>
        <div className='flex items-center gap-3'>
          {withBackButton && (
            <BackButton className='p-0 text-muted-foreground mb-4' variant='link' />
          )}
        </div>
        <h1 className='font-semibold text-2xl mb-1'>{title ?? 'Sin título'}</h1>
        {description && <p className='text-muted-foreground'>{description}</p>}
      </header>

      {/* Content */}
      <div className={className}>
        {children}
      </div>
    </div>
  )
}
