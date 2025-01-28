import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DataTablePagination } from '@/components/ui/datatable-pagination'
import { useState } from 'react'
import { DataTableColumnHeader } from '@/components/ui/datatable-column-header'
import { Input } from '@/components/ui/input'
import { ArrowDownUpIcon, Columns3Icon, InboxIcon, LayoutGridIcon, ListFilterIcon, ListIcon, PlusIcon, SearchIcon, Settings2Icon, TablePropertiesIcon, XCircleIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import PopoverWithTooltip from '@/components/ui/popover-with-tooltip'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useScreenSize } from '@/hooks/useScreenSize'

type DataTableColumnProps = {
  align?: 'left' | 'center' | 'right'
  className?: string
  style?: React.CSSProperties
}

type DataTableClassNames = {
  headers?: string
  rows?: string
}

export interface DataTableProps<TData, TValue> {
  disableSearch?: boolean
  className?: string
  classNames?: DataTableClassNames
  onAdd?: () => void
  columns: (ColumnDef<TData, TValue> & DataTableColumnProps)[]
  data: TData[]
}

const DESIGN_MODES = {
  TABLE: 't',
  GALLERY: 'g',
  LIST: 'l'
}

export function DataTable<TData, TValue> ({
  disableSearch,
  className,
  classNames,
  columns,
  data,
  onAdd
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [selectedDesignMode, setSelectedDesignMode] = useState(DESIGN_MODES.TABLE)

  const { lgScreen } = useScreenSize()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    }
  })

  const isFiltered = table.getState().globalFilter || table.getState().columnFilters.length > 0

  return (
    <>
      <div className="flex justify-between items-center py-2 gap-2">
        {!disableSearch && (
          <div className='relative flex-1 w-full lg:max-w-sm'>
            <SearchIcon className='size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none' />
            <Input
              className="w-full px-9"
              placeholder="Buscar..."
              value={(table.getState().globalFilter ?? '')}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
            />
            {isFiltered && (
              <Button
                className="h-8 px-2 lg:px-2 absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
                variant="link"
                size='icon'
                title='Reiniciar búsqueda'
                onClick={() => {
                  table.setGlobalFilter('')
                  table.resetColumnFilters()
                }}
              >
                <XCircleIcon />
              </Button>
            )}
          </div>
        )}

        <div className='w-full flex flex-1 justify-end items-center gap-1'>
          {lgScreen ? (
            <>
              <ToggleGroup
                type="single"
                value={selectedDesignMode}
                onValueChange={(designMode) => {setSelectedDesignMode(designMode ? designMode : selectedDesignMode)}}
              >
                <Tooltip>
                  <TooltipTrigger>
                    <ToggleGroupItem asChild value={DESIGN_MODES.LIST} className='text-muted-foreground hover:text-foreground'>
                      <ListIcon strokeWidth={1.7} />
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Lista</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <ToggleGroupItem asChild value={DESIGN_MODES.TABLE} className='text-muted-foreground hover:text-foreground'>
                      <TablePropertiesIcon strokeWidth={1.7} />
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tabla</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <ToggleGroupItem asChild value={DESIGN_MODES.GALLERY} className='text-muted-foreground hover:text-foreground'>
                      <LayoutGridIcon strokeWidth={1.7} />
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Galería</p>
                  </TooltipContent>
                </Tooltip>
              </ToggleGroup>
              <Separator orientation='vertical' className='h-7 mx-1' />
              <div>
                <PopoverWithTooltip
                  label='Filtros'
                  trigger={
                    <Button className='h-9 text-sm text-muted-foreground hover:text-foreground' size='icon-sm' variant='ghost'>
                      <ListFilterIcon />
                    </Button>
                  }
                >
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Filtrar</h4>
                      <p className="text-sm text-muted-foreground">
                        Descripción del filtro
                      </p>
                    </div>
                  </div>
                </PopoverWithTooltip>
                <PopoverWithTooltip
                  label='Ordenar'
                  trigger={
                    <Button className='h-9 text-sm text-muted-foreground hover:text-foreground' size='icon-sm' variant='ghost'>
                      <ArrowDownUpIcon />
                    </Button>
                  }
                >
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Ordenar</h4>
                      <p className="text-sm text-muted-foreground">
                        Descripción del filtro ordenar
                      </p>
                    </div>
                  </div>
                </PopoverWithTooltip>
                <DropdownMenu>
                  <Tooltip>
                    <DropdownMenuTrigger asChild>
                      <TooltipTrigger asChild>
                        <Button className='h-9 text-sm text-muted-foreground hover:text-foreground' size='icon-sm' variant='ghost'>
                          <Columns3Icon />
                        </Button>
                      </TooltipTrigger>
                    </DropdownMenuTrigger>
                    <TooltipContent className="bg-secondary font-semibold text-foreground">
                      <p>Ocultar</p>
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ocultar</DropdownMenuLabel>
                    {table
                      .getAllColumns()
                      .filter(
                        (column) => column.getCanHide()
                      )
                      .map((column) => {
                        return (
                          <DropdownMenuItem
                            key={column.id}
                            className={cn('capitalize text-popover-foreground', !column.getIsVisible() && 'line-through opacity-80')}
                            onClick={() => column.toggleVisibility()}
                            onSelect={event => event.preventDefault()}
                          >
                            {column.id}
                          </DropdownMenuItem>
                        )
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Separator orientation='vertical' className='h-7 mx-1' />
            </>
          ) : (
            <Button size='icon-sm' variant='ghost'>
              <Settings2Icon />
            </Button>
          )}
          {onAdd && (
            <Button
              className='h-auto gap-1'
              onClick={onAdd}
            >
              <PlusIcon /> Nuevo
            </Button>
          )}
        </div>
      </div>

      <div className={cn('rounded-md border', className)}>
        <Table>
          <TableHeader className={cn('bg-card', classNames?.headers)}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const { className, align, style } = header.column.columnDef as (ColumnDef<TData, TValue> & DataTableColumnProps)
                  return (
                    <TableHead key={header.id} className={className} style={{ textAlign: align, ...style }}>
                      <DataTableColumnHeader
                        className={className}
                        align={align}
                        style={style}
                        column={header.column}
                        title={header.column.columnDef.header?.toString() ?? ''}
                      />
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={classNames?.rows}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => {
                    const { align, style } = cell.column.columnDef as (ColumnDef<TData, TValue> & DataTableColumnProps)
                    return (
                      <TableCell key={cell.id} style={{ textAlign: align, ...style }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )})}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className={cn('py-6', classNames?.rows)}>
                  <div className='flex flex-col justify-center items-center gap-1 text-muted-foreground'>
                    <InboxIcon size={50} strokeWidth={1} /> Sin resultados
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <DataTablePagination table={table} />
      </div>
    </>
  )
}
