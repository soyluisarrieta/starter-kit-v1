import { createStore } from 'zustand';
import type { RouteDefinition } from '@/wayfinder';
import type { DataTableQuery } from '../types/query';
import type { DataRow } from '../types/row';
import type { ColumnsSlice } from './slices/columns-slice';
import { createColumnsSlice } from './slices/columns-slice';
import type { QuerySlice } from './slices/query-slice';
import { createQuerySlice } from './slices/query-slice';
import type { SelectionSlice } from './slices/selection-slice';
import { createSelectionSlice } from './slices/selection-slice';

export type DataTableStore<TData> = QuerySlice &
    SelectionSlice<TData> &
    ColumnsSlice;

export const DEFAULT_QUERY_PARAMS: DataTableQuery = {
    search: '',
    perPage: '10',
    sortBy: '',
    sortOrder: '',
};

export function createDataTableStore<TData>(
    route: RouteDefinition<'get'>,
    queryParams: DataTableQuery,
) {
    return createStore<DataTableStore<DataRow<TData>>>((...args) => ({
        ...createQuerySlice(route, queryParams, DEFAULT_QUERY_PARAMS)(...args),
        ...createSelectionSlice<DataRow<TData>>()(...args),
        ...createColumnsSlice(...args),
    }));
}
