import type { DataTableQuery } from '@/types/data-table';

export function cleanQueryParams(
    params: DataTableQuery,
): Record<string, string | number> {
    return Object.fromEntries(
        Object.entries(params).filter(
            ([k, v]) => v !== '' && v != null && !(k === 'page' && v === 1),
        ),
    ) as Record<string, string | number>;
}
