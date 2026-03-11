import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { cleanQueryParams } from '@/lib/data-table/clean-query-params';
import { dataTableFetcher } from '@/lib/data-table/data-table-fetcher';
import type { DataTableQuery, Paginated } from '@/types/data-table';

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
