import { createStore } from 'zustand';
import type { DataTableQuery } from '@/types/data-table';
import type { RouteDefinition } from '@/wayfinder';

export const DEFAULT_QUERY_PARAMS: DataTableQuery = {
    search: '',
    perPage: '10',
    sortBy: '',
    sortOrder: '',
};

export interface DataTableStore<TData> {
    route: RouteDefinition<'get'>;
    query: DataTableQuery;
    target: TData | null;

    setSearch: (value: string) => void;
    setPerPage: (value: string) => void;
    setSort: (field: string, order: string) => void;
    setTarget: (row: TData | null) => void;
}

export function createDataTableStore<TData>(
    route: RouteDefinition<'get'>,
    queryParams: DataTableQuery,
) {
    return createStore<DataTableStore<TData>>((set) => ({
        route,
        target: null,
        query: {
            ...DEFAULT_QUERY_PARAMS,
            ...queryParams,
        },

        setSearch: (search) =>
            set((state) => ({
                query: { ...state.query, search },
            })),

        setPerPage: (perPage) =>
            set((state) => ({
                query: { ...state.query, perPage },
            })),

        setSort: (sortBy, sortOrder) =>
            set((state) => ({
                query: { ...state.query, sortBy, sortOrder },
            })),

        setTarget: (target) =>
            set(() => ({
                target,
            })),
    }));
}
