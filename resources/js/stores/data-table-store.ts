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
    selected: Set<string | number>;

    setSearch: (value: string) => void;
    setPerPage: (value: string) => void;
    setSort: (field: string, order: string) => void;
    setTarget: (row: TData | null) => void;
    toggleSelected: (id: string | number) => void;
    toggleAllOnPage: (ids: (string | number)[], checked: boolean) => void;
    clearSelected: () => void;
}

export function createDataTableStore<TData>(
    route: RouteDefinition<'get'>,
    queryParams: DataTableQuery,
) {
    return createStore<DataTableStore<TData>>((set) => ({
        route,
        target: null,
        selected: new Set<string | number>(),
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

        toggleSelected: (id) =>
            set((state) => {
                const next = new Set(state.selected);
                if (next.has(id)) {
                    next.delete(id);
                } else {
                    next.add(id);
                }
                return { selected: next };
            }),

        toggleAllOnPage: (ids, checked) =>
            set((state) => {
                const next = new Set(state.selected);
                if (checked) {
                    ids.forEach((id) => next.add(id));
                } else {
                    ids.forEach((id) => next.delete(id));
                }
                return { selected: next };
            }),

        clearSelected: () =>
            set(() => ({ selected: new Set<string | number>() })),
    }));
}
