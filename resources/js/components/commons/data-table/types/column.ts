import type { ReactNode } from 'react';

export interface DataTableSearchOptions {
    placeholder?: string;
    className?: string;
}

export type CellDef<TData> = ({ row }: { row: TData }) => ReactNode;

export interface ColumnDefBase<TData> {
    header?: () => ReactNode;
    cell?: CellDef<TData>;
    className?: string;
    align?: 'left' | 'center' | 'right';
    hideable?: boolean;
    fit?: boolean;
    sticky?: boolean;
}

export type ColumnDef<T> =
    | (ColumnDefBase<T> & { key: keyof T & string; label: string })
    | (ColumnDefBase<T> & { id: string; label?: string; cell: CellDef<T> });
