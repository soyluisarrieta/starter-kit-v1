import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
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
import { SearchIcon } from 'lucide-react'

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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    }
  })

  return (
    <>
      {!disableSearch && <div className="flex items-center py-4 relative">
        <SearchIcon className='size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground' />
        <Input
          placeholder="Buscar..."
          value={(table.getState().globalFilter) ?? ''}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="max-w-sm pl-9"
        />
      </div>}
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
                            className='w-full !text-destructive justify-start relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0'
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
                <TableCell  colSpan={columns.length} className={cn('h-24 text-center', classNames?.rows)}>
                Sin resultados.
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
