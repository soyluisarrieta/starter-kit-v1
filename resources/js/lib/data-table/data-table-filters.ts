import type { FilterValue, DateRange } from '@/types/data-table';

export function applyGlobalSearch<TData>(
    rows: TData[],
    search: string,
    searchableKeys: Array<keyof TData>,
): TData[] {
    if (!search.trim()) return rows;

    const normalizedSearch = search.toLowerCase().trim();

    return rows.filter((row) =>
        searchableKeys.some((key) => {
            const value = row[key];
            if (value == null) return false;
            return String(value).toLowerCase().includes(normalizedSearch);
        }),
    );
}

export function matchesMultiValueFilter<TData>(
    row: TData,
    columnId: keyof TData,
    values: string[],
): boolean {
    if (values.length === 0) return true;

    const cellValue = row[columnId];
    if (cellValue == null) return false;

    if (Array.isArray(cellValue)) {
        return values.some((v) => cellValue.includes(v));
    }

    return values.includes(String(cellValue));
}

export function matchesDateRangeFilter<TData>(
    row: TData,
    columnId: keyof TData,
    range: DateRange,
): boolean {
    const { from, to } = range;
    if (!from && !to) return true;

    const cellValue = row[columnId];
    if (cellValue == null) return false;

    const date =
        cellValue instanceof Date ? cellValue : new Date(String(cellValue));
    if (Number.isNaN(date.getTime())) return false;

    if (from && to) {
        return date >= from && date <= to;
    }
    if (from) {
        return date >= from;
    }
    if (to) {
        return date <= to;
    }

    return true;
}

export function applyColumnFilters<TData>(
    rows: TData[],
    filters: Record<string, FilterValue>,
): TData[] {
    const filterEntries = Object.entries(filters);
    if (filterEntries.length === 0) return rows;

    return rows.filter((row) =>
        filterEntries.every(([columnId, filter]) => {
            const key = columnId as keyof TData;

            switch (filter.type) {
                case 'multiValue':
                    return matchesMultiValueFilter(row, key, filter.values);
                case 'dateRange':
                    return matchesDateRangeFilter(row, key, filter.range);
                default:
                    return true;
            }
        }),
    );
}

export function filterData<TData>(
    data: TData[],
    globalSearch: string,
    columnFilters: Record<string, FilterValue>,
    searchableKeys: Array<keyof TData>,
): TData[] {
    let result = data;

    if (globalSearch.trim()) {
        result = applyGlobalSearch(result, globalSearch, searchableKeys);
    }

    if (Object.keys(columnFilters).length > 0) {
        result = applyColumnFilters(result, columnFilters);
    }

    return result;
}

export function getActiveFilterCount(
    filters: Record<string, FilterValue>,
): number {
    return Object.values(filters).reduce((count, filter) => {
        switch (filter.type) {
            case 'multiValue':
                return count + (filter.values.length > 0 ? 1 : 0);
            case 'dateRange':
                return count + (filter.range.from || filter.range.to ? 1 : 0);
            default:
                return count;
        }
    }, 0);
}
