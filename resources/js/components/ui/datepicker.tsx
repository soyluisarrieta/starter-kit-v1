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
import { useState } from 'react'

type DatePickerProps = Omit<CalendarProps, 'selected'> & Omit<PropsSingle, 'onSelect' | 'selected'> & {
  value?: string
  onChange: (date: string | undefined) => void
  placeholder?: string
}

export default function DatePicker ({ mode = 'single', value, onChange, placeholder, ...props }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState<Date | null>(null)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal cursor-pointer',
            !value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="h-4 w-4 opacity-50" />
          {value
            ? <span className='capitalize'>{format(value, 'MMMM dd, yyyy', { locale: es })}</span>
            : <span>{placeholder ?? 'Selecciona una fecha'}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 [&_button]:cursor-pointer" align="start">
        <Calendar
          mode={mode}
          selected={value ? parseISO(value) : undefined}
          onSelect={(date) => onChange(date ? format(date, 'yyyy-MM-dd') : undefined)}
          locale={es}
          onDayClick={() => setIsOpen(false)}
          captionLayout="dropdown"
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}
