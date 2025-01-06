import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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

interface DataTableColumnProps {
  align?: 'left' | 'center' | 'right'
  className?: string
  style?: React.CSSProperties
}

export interface DataTableProps<TData, TValue> {
  className?: string
  columns: (ColumnDef<TData, TValue> & DataTableColumnProps)[]
  data: TData[]
}

export function DataTable<TData, TValue> ({
  className,
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className={cn('rounded-md border', className)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const { className, align, style } = header.column.columnDef as (ColumnDef<TData, TValue> & DataTableColumnProps)
                return (
                  <TableHead key={header.id} className={className} style={{ textAlign: align, ...style }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
