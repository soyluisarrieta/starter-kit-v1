import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import * as React from 'react'

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
  value?: Date
  onChange: (date: Date | undefined) => void
  placeholder?: string
}

export default function DatePicker ({ mode = 'single', value, onChange, placeholder, ...props }: DatePickerProps) {
  const [date, setDate] = React.useState(value)

  const handleSelect = (selected: Date | undefined) => {
    setDate(selected)
    onChange(selected)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal cursor-pointer',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-1 h-4 w-4" />
          {date
            ? <span className='capitalize'>{format(date, 'MMMM dd, yyyy', { locale: es })}</span>
            : <span>{placeholder ?? 'Selecciona una fecha'}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 [&_button]:cursor-pointer" align="start">
        <Calendar
          mode={mode}
          selected={date}
          onSelect={handleSelect}
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}
