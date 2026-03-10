import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import {
    createDataTableStore,
    DEFAULT_QUERY_PARAMS,
} from '@/stores/data-table-store';
import type { DataTableInstance, DataTableQuery } from '@/types/data-table';
import type { RouteDefinition } from '@/wayfinder';

// Remove empty values
const cleanQueryParams = (
    queryParams: Record<string, string | number | boolean | null | undefined>,
) =>
    Object.fromEntries(
        Object.entries(queryParams).filter(([, v]) => v !== '' && v != null),
    );

interface UseDataTableOptions {
    route: RouteDefinition<'get'>;
    queryParams: DataTableQuery;
}

export function useDataTable<T>({ route, queryParams }: UseDataTableOptions) {
    const [tableStore] = useState(() =>
        createDataTableStore<T>(route, queryParams),
    );

    useEffect(() => {
        const query = { ...DEFAULT_QUERY_PARAMS, ...queryParams };
        tableStore.setState({ route, query });
    }, [route, queryParams, tableStore]);

    const tableState = useStore(tableStore);

    // Refresh data table
    const refresh = (params?: Partial<DataTableQuery>, url?: string) => {
        const currentQuery = tableStore.getState().query;
        const finalQuery = { ...currentQuery, ...params };
        const targetUrl = url || route;

        const cleanQuery = cleanQueryParams(finalQuery);
        router.get(targetUrl, cleanQuery, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const table: DataTableInstance<T> = {
        ...tableStore,
        ...tableState,
        refresh,
    };

    return table;
}
