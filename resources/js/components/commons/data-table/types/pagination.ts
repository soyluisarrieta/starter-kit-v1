import type { DataRow } from './row';

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
