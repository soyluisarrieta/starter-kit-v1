import { router } from '@inertiajs/react';
import { createStore } from 'zustand';
import { cleanQueryParams } from '@/lib/data-table/clean-query-params';
import type { DataRow, DataTableQuery, RowId } from '@/types/data-table';
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
    selected: Map<RowId, TData>;

    setSearch: (value: string) => void;
    setPerPage: (value: string) => void;
    setSort: (field: string, order: string) => void;
    setTarget: (row: TData | null) => void;
    toggleSelected: (row: TData) => void;
    toggleAllOnPage: (rows: TData[], checked: boolean) => void;
    clearSelected: () => void;
    refresh: (params?: Partial<DataTableQuery>) => void;
}

export function createDataTableStore<TData>(
    route: RouteDefinition<'get'>,
    queryParams: DataTableQuery,
) {
    return createStore<DataTableStore<DataRow<TData>>>((set, get) => ({
        route,
        target: null,
        selected: new Map(),
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

        toggleSelected: (row) =>
            set((state) => {
                const next = new Map(state.selected);
                if (next.has(row.id)) {
                    next.delete(row.id);
                } else {
                    next.set(row.id, row);
                }
                return { selected: next };
            }),

        toggleAllOnPage: (rows, checked) =>
            set((state) => {
                const next = new Map(state.selected);
                if (checked) {
                    rows.forEach((row) => next.set(row.id, row));
                } else {
                    rows.forEach((row) => next.delete(row.id));
                }
                return { selected: next };
            }),

        clearSelected: () => set(() => ({ selected: new Map() })),

        refresh: (params) => {
            const { query, route } = get();
            const newQuery = { ...query, ...params };

            const isPageOnly =
                params !== undefined &&
                Object.keys(params).length === 1 &&
                'page' in params;

            if (isPageOnly) {
                set({ query: newQuery });
            } else {
                router.get(
                    route.url,
                    cleanQueryParams({ ...newQuery, page: undefined }),
                    { preserveState: true, preserveScroll: true },
                );
            }
        },
    }));
}
