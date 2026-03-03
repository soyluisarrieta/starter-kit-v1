import { useEffect, useState } from 'react';
import {
    createDataTableStore,
    DEFAULT_QUERY_PARAMS,
} from '@/stores/data-table-store';
import type { DataTableQuery } from '@/types/data-table';
import type { RouteDefinition } from '@/wayfinder';

interface UseDataTableOptions {
    route: RouteDefinition<'get'>;
    queryParams: DataTableQuery;
}

export function useDataTable({ route, queryParams }: UseDataTableOptions) {
    const [store] = useState(() => createDataTableStore(route, queryParams));

    useEffect(() => {
        store.setState({
            route,
            query: {
                ...DEFAULT_QUERY_PARAMS,
                ...queryParams,
            },
        });
    }, [route, queryParams, store]);

    return store;
}

export type DataTableInstance = ReturnType<typeof createDataTableStore>;
