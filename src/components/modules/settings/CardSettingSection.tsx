import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useId } from 'react'

interface Props {
  htmlFor?: string
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
  defaultChecked?: boolean
  onChange?: () => boolean
}

export default function CardSettingSection ({ htmlFor, title, description, className, defaultChecked = false, onChange, children }: Props): JSX.Element {
  const generateId = useId()
  const idCardSection = htmlFor ?? generateId
  return (
    <div className={cn('flex items-center justify-between space-x-10 p-4 lg:p-8', className)}>
      <Label htmlFor={idCardSection} className="flex flex-col space-y-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        {description && (
          <p className="font-normal leading-snug text-muted-foreground">{description}</p>
        )}
      </Label>
      {children ?? <Switch id={idCardSection} defaultChecked={defaultChecked} onCheckedChange={onChange} />}
    </div>
  )
}
