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
    PaginationLink,
    QueryParams,
} from '@/types/data-table';
import type { RouteDefinition } from '@/wayfinder';

interface DataTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    links: PaginationLink[];
    route: RouteDefinition<'get'>;
    queryParams: QueryParams;
    options?: {
        search?: DataTableSearchInput;
    };
}

export default function DataTable<TData extends object>({
    data,
    columns,
    links,
    route,
    queryParams,
    options,
}: DataTableProps<TData>) {
    const { data: query, setData: setQuery } = useForm({
        search: queryParams.search || '',
        perPage: queryParams.perPage,
        sortBy: queryParams.sortBy,
        sortOrder: queryParams.sortOrder,
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
                    {data.map((row, index) => (
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
                links={links}
                queryParams={queryParams}
                currentPage={(query.perPage || 10).toString()}
                onCurrentPageChange={(value) => setQuery('perPage', value)}
            />
        </div>
    );
}
