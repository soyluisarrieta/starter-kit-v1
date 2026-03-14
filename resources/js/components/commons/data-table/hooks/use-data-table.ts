import { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import { queryClient } from '@/lib/query-client';
import type { RouteDefinition } from '@/wayfinder';
import { cleanQueryParams } from '../lib/clean-query-params';
import {
    createDataTableStore,
    DEFAULT_QUERY_PARAMS,
} from '../store/create-store';
import type { DataTableInstance } from '../types/instance';
import type { Paginated } from '../types/pagination';
import type { DataTableQuery } from '../types/query';
import { useDataTableQuery } from './use-data-table-query';

interface UseDataTableOptions<TData> {
    route: RouteDefinition<'get'>;
    queryParams: DataTableQuery;
    initialData: Paginated<TData>;
}

export function useDataTable<TData>({
    route,
    queryParams,
    initialData,
}: UseDataTableOptions<TData>) {
    // init table store and seed query cache (once)
    const [tableStore] = useState(() => {
        const q = { ...DEFAULT_QUERY_PARAMS, ...queryParams };
        queryClient.setQueryData(
            ['data-table', route.url, cleanQueryParams(q)],
            initialData,
        );
        return createDataTableStore<TData>(route, queryParams);
    });

    // sync cache and store data
    useEffect(() => {
        const q = { ...DEFAULT_QUERY_PARAMS, ...queryParams };
        queryClient.setQueryData(
            ['data-table', route.url, cleanQueryParams(q)],
            initialData,
        );

        tableStore.setState((state) => ({
            route,
            query: { ...q, search: state.query.search },
        }));
    }, [route, queryParams, initialData, tableStore]);

    // subscribe store and run table query
    const tableState = useStore(tableStore);
    const queryResult = useDataTableQuery<TData>({
        url: route.url,
        query: tableState.query,
        initialData,
    });

    // build table instance
    const table: DataTableInstance<TData> = {
        ...tableStore,
        ...tableState,
        ...queryResult,
    };

    return table;
}
