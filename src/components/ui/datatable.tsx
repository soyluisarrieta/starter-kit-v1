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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Icon, icons } from '@/components/icons/Icons'
import { DataTablePagination } from '@/components/ui/datatable-pagination'
import { useState } from 'react'
import { DataTableColumnHeader } from '@/components/ui/datatable-column-header'
import { Input } from '@/components/ui/input'
import { EyeOffIcon, InboxIcon, SearchIcon, XIcon } from 'lucide-react'

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
  enableActionMenu?: boolean
  disableSearch?: boolean
  className?: string
  classNames?: DataTableClassNames
  columns: (ColumnDef<TData, TValue> & DataTableColumnProps)[]
  data: TData[]
}

export function DataTable<TData, TValue> ({
  enableActionMenu,
  disableSearch,
  className,
  classNames,
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

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
          <div className='relative flex-1 max-w-sm'>
            <SearchIcon className='size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground' />
            <Input
              className="w-full pl-9"
              placeholder="Buscar..."
              value={(table.getState().globalFilter ?? '')}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
            />
          </div>
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.setGlobalFilter('')
              table.resetColumnFilters()
            }}
            className="h-8 px-2 lg:px-3"
          >
              Reiniciar <XIcon className="size-4 ml-2" />
          </Button>
        )}

        <div className='flex-1 flex justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="ml-auto"
                variant="outline"
                size='icon'
              >
                <EyeOffIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" >
              <DropdownMenuLabel>Columnas</DropdownMenuLabel>
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
                {enableActionMenu && <TableHead></TableHead>}
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

                  {enableActionMenu && (<TableCell className='w-0'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <Icon element={icons.DotsVertical} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='min-w-40' align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem><Icon element={icons.Detail} />Detalles</DropdownMenuItem>
                        <DropdownMenuItem><Icon element={icons.Edit} /> Editar</DropdownMenuItem>
                        <DropdownMenuSeparator className='bg-border' />
                        <DropdownMenuItem asChild>
                          <Button
                            className='w-full hover:!text-destructive hover:!bg-destructive/10 justify-start relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0'
                            variant='ghost'
                            size='sm'
                          >
                            <Icon element={icons.Delete} />Eliminar
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>)}
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
