import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { DataTablePagination } from '@/components/ui/datatable/datatable-pagination'
import { DataTableColumnHeader } from '@/components/ui/datatable/datatable-column-header'
import { InboxIcon } from 'lucide-react'
import { DataTableClassNames, DataTableColumnProps } from '@/interfaces/datatable'
import { TableToolbar } from '@/components/ui/datatable/datatable-toolbar'

export interface DataTableProps<TData, TValue> {
  disableSearch?: boolean
  className?: string
  classNames?: DataTableClassNames
  onAdd?: () => void
  columns: (ColumnDef<TData, TValue> & DataTableColumnProps)[]
  data: TData[]
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

  return (
    <>
      <TableToolbar table={table} disableSearch={disableSearch} onAdd={onAdd} />
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
                    )
                  })}
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
