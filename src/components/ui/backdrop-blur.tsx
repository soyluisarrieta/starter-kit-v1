import { cn } from '@/lib/utils'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className: string
  children?: React.ReactNode
}

export default function BackdropBlur ({ className, children, ...rest }: Props): JSX.Element {
  return (
    <div className={cn('bg-black/70 backdrop-blur', className)} {...rest}>
      {children}
    </div>
  )
}
