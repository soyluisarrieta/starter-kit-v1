import type { ReactNode } from 'react';

export interface QueryParams {
    search?: string;
    perPage?: string;
    sortBy?: string;
    sortOrder?: string;
}

export interface PaginationLink {
    active: boolean;
    label: string;
    url: string | null;
    page: number | null;
}

export interface Paginated<TData> {
    data: TData[];
    current_page: number;
    per_page: number;
    total: number;
    queryParams: QueryParams;
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

export interface ColumnDef<TData> {
    key: keyof TData & string;
    label: string;
    header?: () => ReactNode;
    cell?: ({ row }: { row: TData }) => ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

export interface DataTableSearchInput {
    enabled?: boolean;
    placeholder?: string;
    className?: string;
}
