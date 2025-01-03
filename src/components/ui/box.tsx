import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const boxVariants = cva(
  '',
  {
    variants: {
      variant: {
        default:
          'bg-card border',
        outline:
          'border border-input bg-transparent shadow-sm',
        solid:
          'bg-card shadow-sm',
        ghost: 'hover:bg-card',
        accent: 'bg-secondary'
      },
      size: {
        default: 'p-5 rounded-lg',
        sm: 'p-3 rounded-md',
        lg: 'p-8 rounded-xl'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

interface Props {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'solid' | 'ghost' | 'accent'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  style?: React.CSSProperties
}

export default function Box ({ children, variant, size, className, style, ...props }: Props) {
  return (
    <div className={cn(boxVariants({ variant, size }), className)} style={style} {...props}>
      {children}
    </div>
  )
}
