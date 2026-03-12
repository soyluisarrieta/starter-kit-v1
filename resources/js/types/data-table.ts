import type { ComponentType, ReactNode } from 'react';
import type { StoreApi } from 'zustand';
import type { DataTableStore } from '@/stores/data-table-store';

export type RowId = string | number;
export type BaseRow = { id: RowId };
export type DataRow<TData> = BaseRow & TData;

export interface PaginationLink {
    active: boolean;
    label: string;
    url: string | null;
}

export interface Paginated<TData> {
    data: DataRow<TData>[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number | null;
    to: number | null;
    prev_page_url: string | null;
    next_page_url: string | null;
    first_page_url: string;
    last_page_url: string;
    links: PaginationLink[];
    path: string;
}

export interface DataTableQuery {
    search?: string;
    perPage?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
}

export type DataTableStoreApi<TData> = StoreApi<DataTableStore<DataRow<TData>>>;

export interface DataTableInstance<TData>
    extends DataTableStoreApi<TData>, DataTableStore<DataRow<TData>> {
    data: Paginated<TData>;
    isFetching: boolean;
}

type CellDef<TData> = ({ row }: { row: TData }) => ReactNode;

interface ColumnDefBase<TData> {
    header?: () => ReactNode;
    cell?: CellDef<TData>;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

export type ColumnDef<T> =
    | (ColumnDefBase<T> & { key: keyof T & string; label: string })
    | (ColumnDefBase<T> & { id: string; label?: string; cell: CellDef<T> });

export interface CustomBulkAction {
    label: string;
    icon?: ComponentType<{ className?: string }>;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    onClick: (ids: RowId[]) => void;
}

export interface BulkActionsConfig {
    delete?: ((ids: RowId[]) => void) | false;
    export?:
        | { columns: Array<{ id: string; header: string }>; filename: string }
        | false;
    actions?: CustomBulkAction[];
}
