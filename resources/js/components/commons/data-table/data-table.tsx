import { DataTableBulkActions } from '@/components/commons/data-table/data-table-bulk-actions';
import {
    DataTableHeaderCheckbox,
    DataTableRowCheckbox,
} from '@/components/commons/data-table/data-table-checkbox';
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
    BulkActionsConfig,
    ColumnDef,
    DTable,
    DataRow,
} from '@/types/data-table';

export interface DataTableSearchOptions {
    placeholder?: string;
    className?: string;
}

interface DataTableOptions {
    search?: DataTableSearchOptions;
}

const DEFAULT_OPTIONS: DataTableOptions = {
    search: {
        placeholder: 'Buscar...',
    },
};

interface DataTableProps<TData extends DataRow> extends DTable<TData> {
    columns: ColumnDef<TData>[];
    options?: DataTableOptions;
    bulkActions?: BulkActionsConfig;
}

export default function DataTable<TData extends DataRow>({
    table,
    columns,
    options,
    bulkActions,
}: DataTableProps<TData>) {
    const { search } = { ...DEFAULT_OPTIONS, ...options };
    const { data: rows, links } = table.data;

    const selectable = Boolean(bulkActions);
    const pageIds = selectable ? rows.map((row) => row.id) : [];

    return (
        <div className="space-y-2">
            <DataTableInputSearch table={table} {...search} />

            <Table>
                <TableHeader>
                    <TableRow
                        className="border-0! [&>th]:first:rounded-l-lg [&>th]:last:rounded-r-lg"
                        style={{ fontSize: '0.8rem' }}
                    >
                        {selectable && (
                            <TableHead className="w-0 bg-muted px-4">
                                <DataTableHeaderCheckbox
                                    table={table}
                                    pageIds={pageIds}
                                />
                            </TableHead>
                        )}
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
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            {selectable && (
                                <TableCell className="px-4">
                                    <DataTableRowCheckbox
                                        table={table}
                                        rowId={row.id}
                                    />
                                </TableCell>
                            )}
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

            <DataTablePagination table={table} links={links} />

            {bulkActions && (
                <DataTableBulkActions table={table} config={bulkActions} />
            )}
        </div>
    );
}
