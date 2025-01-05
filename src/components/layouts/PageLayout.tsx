import { ReactNode } from 'react'

interface PageLayoutProps  {
  title: string
  description?: string
  createdAt?: string | null
  updatedAt?: string | null
  disableActionButtons?: boolean
  children: ReactNode
  className?: string
}

export default function PageLayout ({ title, description, className, children }: PageLayoutProps) {

  return (
    <div className='min-h-svh relative flex flex-col flex-1'>
      {/* Header */}
      <header className='px-4 lg:px-8 pt-7 pb-5 lg:pb-4'>
        <h1 className='font-semibold text-xl mb-1'>{title ?? 'Sin título'}</h1>
        {description && <p className='text-muted-foreground'>{description}</p>}
      </header>

      {/* Content */}
      <div className={className}>
        {children}
      </div>
    </div>
  )
}
