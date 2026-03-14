import { router } from '@inertiajs/react';
import type { StateCreator } from 'zustand';
import type { RouteDefinition } from '@/wayfinder';
import { cleanQueryParams } from '../../lib/clean-query-params';
import type { DataTableQuery } from '../../types/query';

export interface QuerySlice {
    route: RouteDefinition<'get'>;
    query: DataTableQuery;

    setSearch: (value: string) => void;
    setPerPage: (value: string) => void;
    setSort: (field: string, order: string) => void;
    refresh: (params?: Partial<DataTableQuery>) => void;
}

export const createQuerySlice =
    (
        route: RouteDefinition<'get'>,
        queryParams: DataTableQuery,
        defaultQueryParams: DataTableQuery,
    ): StateCreator<QuerySlice> =>
        (set, get) => ({
            route,
            query: {
                ...defaultQueryParams,
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
        });
