import type {
    ColumnDef,
    SortingState,
    VisibilityState,
    RowSelectionState,
    Table,
} from '@tanstack/react-table';
import type { ReactNode } from 'react';

export type ExportFormat = 'pdf' | 'csv' | 'excel' | 'json';

export interface DateRange {
    from: Date | undefined;
    to: Date | undefined;
}

export interface MultiValueFilter {
    readonly type: 'multiValue';
    columnId: string;
    values: string[];
}

export interface DateRangeFilter {
    readonly type: 'dateRange';
    columnId: string;
    range: DateRange;
}

export type FilterValue = MultiValueFilter | DateRangeFilter;

export interface DataTableFiltersState {
    globalSearch: string;
    columnFilters: Record<string, FilterValue>;
}

export interface DataTableState {
    sorting: SortingState;
    columnVisibility: VisibilityState;
    rowSelection: RowSelectionState;
    filters: DataTableFiltersState;
    pagination: {
        pageIndex: number;
        pageSize: number;
    };
}

export interface ResponsiveColumnConfig {
    columnId: string;
    minWidth: number;
}

export interface FilterOption {
    label: string;
    value: string;
}

export interface ColumnFilterConfig {
    columnId: string;
    label: string;
    type: 'multiValue' | 'dateRange';
    options?: FilterOption[];
}

export interface DataTableConfig<TData> {
    columns: ColumnDef<TData, unknown>[];
    responsiveColumns?: ResponsiveColumnConfig[];
    filterConfigs?: ColumnFilterConfig[];
    pageSizeOptions?: number[];
    enableRowSelection?: boolean;
    enableExport?: boolean;
    enableColumnToggle?: boolean;
}

export interface DataTableRowAction<TData> {
    label: string;
    icon?: ReactNode;
    onClick: (row: TData) => void;
    variant?: 'default' | 'destructive';
}

export interface DataTableBulkAction<TData> {
    label: string;
    icon?: ReactNode;
    onClick: (rows: TData[]) => void;
    variant?: 'default' | 'destructive';
}

export type DataTableInstance<TData> = Table<TData>;
