import { Icon, icons } from '@/components/icons/Icons'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router'

interface BackButtonProps extends ButtonProps {
  children?: ReactNode
}

export default function BackButton ({ className, children, ...rest }: BackButtonProps) {
  const navigate = useNavigate()
  return (
    <Button className={cn('flex', className)} {...rest} onClick={() => navigate(-1)}>
      {children ? children : <><Icon element={icons.Back} /> Atrás</>}
    </Button>
  )
}
