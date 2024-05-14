import { Button } from '@/components/ui/button'
import { PopoverTrigger, PopoverContent, Popover } from '@/components/ui/popover'
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import moment from 'moment'
import { useState } from 'react'

interface Props {
  value?: string
  placeholder?: string
  onChange: (...event: any[]) => void
}

export default function DatePicker ({ value, onChange, placeholder }: Props): JSX.Element {
  const [selected, setSelected] = useState<Date>()
  const [pickedDate, setPickedDate] = useState(new Date('10-17-1994'))

  const handleMonthChange = (month: string): void => {
    const newDate = new Date(pickedDate.getFullYear(), +month - 1, pickedDate.getDate())
    setPickedDate(newDate)
  }

  const handleYearChange = (year: string): void => {
    const newDate = new Date(+year, pickedDate.getMonth(), pickedDate.getDate())
    setPickedDate(newDate)
  }

  const handleNextMonth = (): void => {
    const nextMonth = pickedDate.getMonth() + 1
    const newDate = new Date(pickedDate.getFullYear(), nextMonth, pickedDate.getDate())
    setPickedDate(newDate)
  }

  const handlePreviousMonth = (): void => {
    const previousMonth = pickedDate.getMonth() - 1
    const newDate = new Date(pickedDate.getFullYear(), previousMonth, pickedDate.getDate())
    setPickedDate(newDate)
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={cn('w-[240px] justify-start text-left font-normal', !value && 'text-muted-foreground')} variant="outline">
          <CalendarDaysIcon className='mr-1 h-4 w-4 -translate-x-1' />
          <span className='first-letter:capitalize'>
            {value
              ? moment(value as moment.MomentInput).format('MMMM D - YYYY')
              : placeholder ?? 'Seleccione una fecha'}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0 bg-background">
        <div className="flex items-center justify-between py-4 px-2 border-b border-muted -mb-3">
          <div className="w-full flex items-center justify-around gap-1">
            <Button className='w-7' size="icon" variant="ghost" onClick={handleNextMonth}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Select
              onValueChange={handleMonthChange}
              value={pickedDate ? (pickedDate.getMonth() + 1).toString() : '1'}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Octubre" />
              </SelectTrigger>
              <SelectContent className='bg-background border-input'>
                <SelectItem value="1">Enero</SelectItem>
                <SelectItem value="2">Febrero</SelectItem>
                <SelectItem value="3">Marzo</SelectItem>
                <SelectItem value="4">Abril</SelectItem>
                <SelectItem value="5">Mayo</SelectItem>
                <SelectItem value="6">Junio</SelectItem>
                <SelectItem value="7">Julio</SelectItem>
                <SelectItem value="8">Agosto</SelectItem>
                <SelectItem value="9">Septiembre</SelectItem>
                <SelectItem value="10">Octubre</SelectItem>
                <SelectItem value="11">Noviembre</SelectItem>
                <SelectItem value="12">Diciembre</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleYearChange}
              value={pickedDate ? pickedDate.getFullYear().toString() : '1994'}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder={'1994'} />
              </SelectTrigger>
              <SelectContent className='bg-background border-input'>
                {Array.from({ length: 100 }, (_, index) => new Date().getFullYear() - index).map((year) => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className='w-7' size="icon" variant="ghost" onClick={handlePreviousMonth}>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Calendar
          disableNavigation
          classNames={{ caption: 'hidden', cell: 'bg-transparent' }}
          month={pickedDate}
          selected={selected}
          onSelect={(date) => { setSelected(date); onChange(date) }}
          mode="single"
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

function CalendarDaysIcon ({ className }: ClassNameProp): JSX.Element {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}

function ChevronLeftIcon ({ className }: ClassNameProp): JSX.Element {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon ({ className }: ClassNameProp): JSX.Element {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
