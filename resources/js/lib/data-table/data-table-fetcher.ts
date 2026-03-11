import axios from 'axios';
import type { Paginated } from '@/types/data-table';

export async function dataTableFetcher<TData>(
    url: string,
    params: Record<string, string | number>,
): Promise<Paginated<TData>> {
    const { data } = await axios.get<Paginated<TData>>(url, {
        params,
        headers: { Accept: 'application/json' },
    });
    return data;
}
