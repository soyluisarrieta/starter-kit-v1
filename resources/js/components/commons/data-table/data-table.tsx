import { useForm } from '@inertiajs/react';
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
import { cn } from '@/lib/utils';
import type {
    ColumnDef,
    DataTableSearchInput,
    Paginated,
    QueryParams,
} from '@/types/data-table';
import type { RouteDefinition } from '@/wayfinder';

interface DataTableProps<TData> {
    data: Paginated<TData>;
    route: RouteDefinition<'get'>;
    columns: ColumnDef<TData>[];
    queryParams: QueryParams;
    options?: {
        search?: DataTableSearchInput;
    };
}

export default function DataTable<TData extends object>({
    data: table,
    route,
    columns,
    queryParams,
    options,
}: DataTableProps<TData>) {
    const { data: query, setData: setQuery } = useForm({
        search: queryParams?.search || '',
        perPage: queryParams?.perPage,
        sortBy: queryParams?.sortBy,
        sortOrder: queryParams?.sortOrder,
    });

    return (
        <div className="space-y-2">
            <DataTableInputSearch
                route={route}
                queryParams={queryParams}
                onValueChange={(value) => setQuery('search', value)}
                value={query.search}
                {...options?.search}
            />

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
                                    queryParams={queryParams}
                                    route={route}
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
                    {table.data.map((row, index) => (
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

            <DataTablePagination
                route={route}
                queryParams={queryParams}
                links={table.links}
                currentPage={(query.perPage || 10).toString()}
                onCurrentPageChange={(value) => setQuery('perPage', value)}
            />
        </div>
    );
}
