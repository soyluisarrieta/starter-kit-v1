import DataTableInputSearch from '@/components/commons/data-table/data-table-input-search';
import DataTablePagination from '@/components/commons/data-table/data-table-pagination';
import DataTableSortList from '@/components/commons/data-table/data-table-sort-list';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { DataTableInstance } from '@/hooks/use-data-table';
import { cn } from '@/lib/utils';
import type {
    ColumnDef,
    DataTableSearchInput,
    Paginated,
} from '@/types/data-table';

interface DataTableProps<TData> {
    table: DataTableInstance;
    data: Paginated<TData>;
    columns: ColumnDef<TData>[];
    options?: {
        search?: DataTableSearchInput;
    };
}

export default function DataTable<TData extends object>({
    table,
    data,
    columns,
    options,
}: DataTableProps<TData>) {
    return (
        <div className="space-y-2">
            <DataTableInputSearch table={table} {...options?.search} />

            <Table>
                <TableHeader>
                    <TableRow
                        className="border-0! [&>th]:first:rounded-l-lg [&>th]:last:rounded-r-lg"
                        style={{ fontSize: '0.8rem' }}
                    >
                        {columns.map((column) => (
                            <TableHead
                                key={column.key}
                                className={cn(
                                    'bg-muted px-4 font-bold text-muted-foreground',
                                    column.className,
                                )}
                                style={{ textAlign: column.align }}
                            >
                                <DataTableSortList
                                    table={table}
                                    field={column.key}
                                >
                                    {column.header
                                        ? column.header()
                                        : column.label}
                                </DataTableSortList>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.data.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.key}
                                    className={cn('px-4', column.className)}
                                    style={{ textAlign: column.align }}
                                >
                                    {column.cell?.({ row }) ??
                                        String(row[column.key])}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <DataTablePagination table={table} links={data.links} />
        </div>
    );
}
