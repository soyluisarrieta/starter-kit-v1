import { Table } from '@/components/ui/table';
import DataTableBody from './data-table-body';
import { DataTableBulkActions } from './data-table-bulk-actions';
import { DataTableProvider } from './data-table-context';
import DataTableHead from './data-table-head';
import DataTablePagination from './data-table-pagination';
import DataTableToolbar from './data-table-toolbar';
import { getColumnId } from './lib/column-helpers';
import type {
    BulkActionsConfig,
    ColumnDef,
    DataTableInstance,
    DataTableSearchOptions,
} from './types';

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
    const { data: rows, current_page, last_page } = table.data;

    const selectable = Boolean(bulkActions);
    const pageRows = selectable ? rows : [];

    const visibleColumns = columns.filter(
        (column) => !table.hiddenColumns.has(getColumnId(column)),
    );

    const hideableVisibleCount = visibleColumns.filter(
        (c) => c.hideable !== false,
    ).length;

    return (
        <DataTableProvider table={table}>
            <div className="space-y-2">
                <DataTableToolbar columns={columns} search={search} />

                <Table>
                    <DataTableHead
                        visibleColumns={visibleColumns}
                        selectable={selectable}
                        pageRows={pageRows}
                        hideableVisibleCount={hideableVisibleCount}
                    />
                    <DataTableBody
                        rows={rows}
                        visibleColumns={visibleColumns}
                        selectable={selectable}
                    />
                </Table>

                <DataTablePagination
                    currentPage={current_page}
                    lastPage={last_page}
                />

                {bulkActions && <DataTableBulkActions config={bulkActions} />}
            </div>
        </DataTableProvider>
    );
}
