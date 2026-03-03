import { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import {
    createDataTableStore,
    DEFAULT_QUERY_PARAMS,
} from '@/stores/data-table-store';
import type { DataTableInstance, DataTableQuery } from '@/types/data-table';
import type { RouteDefinition } from '@/wayfinder';

interface UseDataTableOptions {
    route: RouteDefinition<'get'>;
    queryParams: DataTableQuery;
}

export function useDataTable<T>({ route, queryParams }: UseDataTableOptions) {
    const dataTableStore = createDataTableStore<T>(route, queryParams);
    const [tableStore] = useState(() => dataTableStore);

    useEffect(() => {
        const query = { ...DEFAULT_QUERY_PARAMS, ...queryParams };
        tableStore.setState({ route, query });
    }, [route, queryParams, tableStore]);

    const table: DataTableInstance<T> = {
        ...tableStore,
        ...useStore(tableStore),
    };

    return table;
}
