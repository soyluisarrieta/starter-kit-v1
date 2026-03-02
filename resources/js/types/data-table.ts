import type { ReactNode } from 'react';

export interface ColumnDef<TData> {
    key: keyof TData & string;
    label: string;
    header?: () => ReactNode;
    cell?: ({ row }: { row: TData }) => ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

export interface QueryParams {
    search?: string;
}

export interface DataTableSearchInput {
    enabled?: boolean;
    placeholder?: string;
    className?: string;
}
