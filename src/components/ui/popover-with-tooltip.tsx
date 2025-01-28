import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface PopoverWithTooltipProps {
  label?: string
  trigger: JSX.Element
  disableTooltip?: boolean
  children: React.ReactNode
}

export default function PopoverWithTooltip ({ label, trigger: Trigger, disableTooltip, children }: PopoverWithTooltipProps) {
  return (
    <Popover>
      <Tooltip>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            {Trigger}
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent hidden={disableTooltip}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="w-80" align='start'>
        {children}
      </PopoverContent>
    </Popover>
  )
}
