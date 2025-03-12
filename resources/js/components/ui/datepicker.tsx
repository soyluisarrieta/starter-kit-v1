import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

import { Button } from '@/components/ui/button'
import { Calendar, CalendarProps } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { PropsSingle } from 'react-day-picker'

type DatePickerProps = Omit<CalendarProps, 'selected'> & Omit<PropsSingle, 'onSelect' | 'selected'> & {
  value?: string
  onChange: (date: string | undefined) => void
  placeholder?: string
}

export default function DatePicker ({ mode = 'single', value, onChange, placeholder, ...props }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal cursor-pointer',
            !value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-1 h-4 w-4" />
          {value
            ? <span className='capitalize'>{format(parseISO(value), 'MMMM dd, yyyy', { locale: es })}</span>
            : <span>{placeholder ?? 'Selecciona una fecha'}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 [&_button]:cursor-pointer" align="start">
        <Calendar
          mode={mode}
          selected={value ? parseISO(value) : undefined}
          onSelect={(date) => onChange(date ? format(date, 'yyyy-MM-dd') : undefined)}
          locale={es}
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}
