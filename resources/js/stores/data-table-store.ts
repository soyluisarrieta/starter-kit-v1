import { createStore } from 'zustand';
import type { DataTableQuery } from '@/types/data-table';
import type { RouteDefinition } from '@/wayfinder';

export const DEFAULT_QUERY_PARAMS: DataTableQuery = {
    search: '',
    perPage: '10',
    sortBy: '',
    sortOrder: '',
};

export interface DataTableStore {
    route: RouteDefinition<'get'>;
    query: DataTableQuery;

    setSearch: (value: string) => void;
    setPerPage: (value: string) => void;
    setSort: (field: string, order: string) => void;
}

export function createDataTableStore(
    route: RouteDefinition<'get'>,
    queryParams: DataTableQuery,
) {
    const query = {
        ...DEFAULT_QUERY_PARAMS,
        ...queryParams,
    };

    return createStore<DataTableStore>((set) => ({
        route,
        query,

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
    }));
}
