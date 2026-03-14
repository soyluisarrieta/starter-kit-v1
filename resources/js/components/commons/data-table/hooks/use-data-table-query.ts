import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { cleanQueryParams } from '../lib/clean-query-params';
import { dataTableFetcher } from '../lib/fetcher';
import type { Paginated } from '../types/pagination';
import type { DataTableQuery } from '../types/query';

interface UseDataTableQueryOptions<TData> {
    url: string;
    query: DataTableQuery;
    initialData: Paginated<TData>;
}

export function useDataTableQuery<TData>({
    url,
    query,
    initialData,
}: UseDataTableQueryOptions<TData>) {
    const cleanQuery = cleanQueryParams(query);

    const queryResult = useQuery<Paginated<TData>>({
        queryKey: ['data-table', url, cleanQuery],
        queryFn: () => dataTableFetcher<TData>(url, cleanQuery),
        placeholderData: keepPreviousData,
    });

    return {
        ...queryResult,
        data: queryResult.data ?? initialData,
    };
}
