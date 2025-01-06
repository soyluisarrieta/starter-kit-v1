import { Icon, icons } from '@/components/icons/Icons'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { useLocation } from 'wouter'

interface BackButtonProps extends ButtonProps {
  children?: ReactNode
}

export default function BackButton ({ className, children, ...rest }: BackButtonProps) {
  const [location] = useLocation()
  const newLocation = location.substring(0, location.lastIndexOf('/'))
  return newLocation === '' ? null : (
    <Button className={cn('flex', className)} {...rest} to={newLocation}>
      {children ? children : <><Icon element={icons.Back} /> Atrás</>}
    </Button>
  )
}
