import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
} from '@tanstack/react-table';
import { useEffect, useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useResponsiveColumns } from '@/hooks/use-responsive-columns';
import { filterData } from '@/lib/data-table/data-table-filters';
import { useDataTableStore } from '@/stores/data-table-store';
import type {
    ColumnFilterConfig,
    DataTableRowAction,
    DataTableBulkAction,
    ResponsiveColumnConfig,
} from '@/types/data-table';
import { DataTableActiveFilters } from './data-table-active-filters';
import { DataTableBulkActions } from './data-table-bulk-actions';
import { DataTableColumnToggle } from './data-table-column-toggle';
import { DataTableEmpty } from './data-table-empty';
import { DataTableFilters } from './data-table-filters';
import { DataTablePagination } from './data-table-pagination';
import { DataTableRowActions } from './data-table-row-actions';
import { DataTableSearch } from './data-table-search';

interface DataTableProps<TData extends object> {
    data: TData[];
    columns: ColumnDef<TData, unknown>[];
    searchableColumns?: Array<keyof TData>;
    filterConfigs?: ColumnFilterConfig[];
    responsiveColumns?: ResponsiveColumnConfig[];
    rowActions?: DataTableRowAction<TData>[];
    bulkActions?: DataTableBulkAction<TData>[];
    onDelete?: (rows: TData[]) => void;
    enableRowSelection?: boolean;
    enableExport?: boolean;
    enableColumnToggle?: boolean;
    pageSizeOptions?: number[];
    exportFilename?: string;
    searchPlaceholder?: string;
}

export function DataTable<TData extends object>({
    data,
    columns,
    searchableColumns = [],
    filterConfigs = [],
    responsiveColumns = [],
    rowActions = [],
    bulkActions = [],
    onDelete,
    enableRowSelection = true,
    enableExport = true,
    enableColumnToggle = true,
    pageSizeOptions = [10, 20, 30, 50, 100],
    exportFilename = 'datos',
    searchPlaceholder = 'Buscar...',
}: DataTableProps<TData>) {
    const sorting = useDataTableStore((state) => state.sorting);
    const setSorting = useDataTableStore((state) => state.setSorting);
    const columnVisibility = useDataTableStore(
        (state) => state.columnVisibility,
    );
    const setColumnVisibility = useDataTableStore(
        (state) => state.setColumnVisibility,
    );
    const rowSelection = useDataTableStore((state) => state.rowSelection);
    const setRowSelection = useDataTableStore((state) => state.setRowSelection);
    const { globalSearch, columnFilters } = useDataTableStore(
        (state) => state.filters,
    );
    const { pageIndex, pageSize } = useDataTableStore(
        (state) => state.pagination,
    );

    const filteredData = useMemo(
        () => filterData(data, globalSearch, columnFilters, searchableColumns),
        [data, globalSearch, columnFilters, searchableColumns],
    );

    const selectionColumn: ColumnDef<TData, unknown> = useMemo(
        () => ({
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Seleccionar todo"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Seleccionar fila"
                />
            ),
            enableSorting: false,
            enableHiding: false,
            size: 40,
        }),
        [],
    );

    const actionsColumn: ColumnDef<TData, unknown> = useMemo(
        () => ({
            id: 'actions',
            header: () => <span className="sr-only">Acciones</span>,
            cell: ({ row }) => (
                <DataTableRowActions row={row.original} actions={rowActions} />
            ),
            enableSorting: false,
            enableHiding: false,
            size: 50,
        }),
        [rowActions],
    );

    const tableColumns = useMemo(() => {
        const cols: ColumnDef<TData, unknown>[] = [];

        if (enableRowSelection) {
            cols.push(selectionColumn);
        }

        cols.push(...columns);

        if (rowActions.length > 0) {
            cols.push(actionsColumn);
        }

        return cols;
    }, [
        columns,
        enableRowSelection,
        rowActions.length,
        selectionColumn,
        actionsColumn,
    ]);

    const table = useReactTable({
        data: filteredData,
        columns: tableColumns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            pagination: { pageIndex, pageSize },
        },
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualFiltering: true,
        enableRowSelection,
    });

    useResponsiveColumns({
        configs: responsiveColumns,
        onVisibilityChange: setColumnVisibility,
        currentVisibility: columnVisibility,
    });

    useEffect(() => {
        table.setPageIndex(pageIndex);
    }, [table, pageIndex]);

    useEffect(() => {
        table.setPageSize(pageSize);
    }, [table, pageSize]);

    const hasData = data.length > 0;
    const hasFilteredData = filteredData.length > 0;

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <DataTableSearch placeholder={searchPlaceholder} />

                <div className="flex flex-1 items-center justify-between gap-2">
                    <DataTableFilters configs={filterConfigs} />
                    <div className="flex items-center gap-2">
                        <DataTableBulkActions
                            table={table}
                            data={filteredData}
                            customActions={bulkActions}
                            onDelete={onDelete}
                            enableExport={enableExport}
                            exportFilename={exportFilename}
                        />
                        {enableColumnToggle && (
                            <DataTableColumnToggle table={table} />
                        )}
                    </div>
                </div>
            </div>

            {/* Active filters section - shows between toolbar and table */}
            <DataTableActiveFilters filterConfigs={filterConfigs} />

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="bg-muted/50"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        style={{
                                            width:
                                                header.getSize() !== 150
                                                    ? header.getSize()
                                                    : undefined,
                                        }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {hasFilteredData ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={tableColumns.length}
                                    className="h-24 text-center"
                                >
                                    <DataTableEmpty hasData={hasData} />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination
                table={table}
                pageSizeOptions={pageSizeOptions}
            />
        </div>
    );
}
