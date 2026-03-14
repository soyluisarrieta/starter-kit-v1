import { DataTableBulkActions } from '@/components/commons/data-table/data-table-bulk-actions';
import {
    DataTableHeaderCheckbox,
    DataTableRowCheckbox,
} from '@/components/commons/data-table/data-table-checkbox';
import DataTableColumnVisibility from '@/components/commons/data-table/data-table-column-visibility';
import { DataTableProvider } from '@/components/commons/data-table/data-table-context';
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
    DataTableInstance,
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

interface DataTableProps<TData> {
    table: DataTableInstance<TData>;
    columns: ColumnDef<TData>[];
    options?: DataTableOptions;
    bulkActions?: BulkActionsConfig;
}

export default function DataTable<TData>({
    table,
    columns,
    options,
    bulkActions,
}: DataTableProps<TData>) {
    const { search } = { ...DEFAULT_OPTIONS, ...options };
    const { data: rows, links } = table.data;

    const selectable = Boolean(bulkActions);
    const pageRows = selectable ? rows : [];

    const visibleColumns = columns.filter((column) => {
        const colId = 'key' in column ? column.key : column.id;
        return !table.hiddenColumns.has(colId);
    });

    const hideableVisibleCount = visibleColumns.filter(
        (c) => c.hideable !== false,
    ).length;

    return (
        <DataTableProvider table={table}>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <DataTableInputSearch {...search} />
                    <DataTableColumnVisibility columns={columns} />
                </div>

                <Table>
                    <TableHeader>
                        <TableRow
                            className="border-0! [&>th]:first:rounded-l-lg [&>th]:last:rounded-r-lg"
                            style={{ fontSize: '0.8rem' }}
                        >
                            {selectable && (
                                <TableHead className="w-px bg-muted px-4">
                                    <DataTableHeaderCheckbox
                                        pageRows={pageRows}
                                    />
                                </TableHead>
                            )}
                            {visibleColumns.map((column) => {
                                const colId =
                                    'key' in column ? column.key : column.id;
                                return (
                                    <TableHead
                                        key={colId}
                                        className={cn(
                                            'bg-muted px-4 font-bold text-muted-foreground',
                                            column.fit && 'w-px',
                                            column.sticky &&
                                                'sticky right-0 z-10',
                                            column.className,
                                        )}
                                        style={{ textAlign: column.align }}
                                    >
                                        <DataTableSortList
                                            columnId={colId}
                                            field={
                                                'key' in column
                                                    ? column.key
                                                    : undefined
                                            }
                                            totalColumns={hideableVisibleCount}
                                            hideable={column.hideable !== false}
                                        >
                                            {column.header?.() ?? column.label}
                                        </DataTableSortList>
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} className="group">
                                {selectable && (
                                    <TableCell className="w-px px-4">
                                        <DataTableRowCheckbox row={row} />
                                    </TableCell>
                                )}
                                {visibleColumns.map((column) => {
                                    const colId =
                                        'key' in column
                                            ? column.key
                                            : column.id;
                                    return (
                                        <TableCell
                                            key={colId}
                                            className={cn(
                                                'bg-background/97 px-4 group-hover:bg-muted/50',
                                                column.fit && 'w-px',
                                                column.sticky &&
                                                    'sticky right-0 group-hover:bg-background/90 before:absolute before:inset-0 before:-z-10 group-hover:before:bg-muted/50',
                                                column.className,
                                            )}
                                            style={{ textAlign: column.align }}
                                        >
                                            {'key' in column
                                                ? (column.cell?.({ row }) ??
                                                  String(row[column.key]))
                                                : column.cell({ row })}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <DataTablePagination links={links} />

                {bulkActions && <DataTableBulkActions config={bulkActions} />}
            </div>
        </DataTableProvider>
    );
}
