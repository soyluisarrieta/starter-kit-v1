import { DataTable } from '@/components/ui/datatable'
import { ColumnDef } from '@tanstack/react-table'

interface ListProps<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  className?: string
}

export default function List<TData> ({ className, data, columns }: ListProps<TData>) {
  return (
    <div className={className}>
      <DataTable
        data={data}
        columns={columns}
      />
    </div>
  )
}
