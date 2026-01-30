import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { X } from 'lucide-react';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDataTableStore } from '@/stores/data-table-store';
import type {
    ColumnFilterConfig,
    FilterValue,
    DateRange,
} from '@/types/data-table';

interface ActiveFilterBadgeProps {
    label: string;
    value: string;
    onRemove: () => void;
}

function ActiveFilterBadge({ label, value, onRemove }: ActiveFilterBadgeProps) {
    return (
        <Badge variant="secondary" className="gap-1 pr-1">
            <span className="text-muted-foreground">{label}:</span>
            <span>{value}</span>
            <button
                type="button"
                onClick={onRemove}
                className="ml-1 rounded-sm p-0.5 hover:bg-muted-foreground/20"
                aria-label={`Eliminar filtro ${label}: ${value}`}
            >
                <X className="size-3" />
            </button>
        </Badge>
    );
}

function formatDateRangeLabel(range: DateRange): string {
    if (range.from && range.to) {
        return `${format(range.from, 'dd/MM/yy', { locale: es })} - ${format(range.to, 'dd/MM/yy', { locale: es })}`;
    }
    if (range.from) {
        return `Desde ${format(range.from, 'dd/MM/yy', { locale: es })}`;
    }
    if (range.to) {
        return `Hasta ${format(range.to, 'dd/MM/yy', { locale: es })}`;
    }
    return '';
}

interface DataTableActiveFiltersProps {
    filterConfigs: ColumnFilterConfig[];
}

export function DataTableActiveFilters({
    filterConfigs,
}: DataTableActiveFiltersProps) {
    const globalSearch = useDataTableStore(
        (state) => state.filters.globalSearch,
    );
    const columnFilters = useDataTableStore(
        (state) => state.filters.columnFilters,
    );
    const setGlobalSearch = useDataTableStore((state) => state.setGlobalSearch);
    const setColumnFilter = useDataTableStore((state) => state.setColumnFilter);
    const removeColumnFilter = useDataTableStore(
        (state) => state.removeColumnFilter,
    );
    const clearAllFilters = useDataTableStore((state) => state.clearAllFilters);

    const configMap = useMemo(() => {
        const map = new Map<string, ColumnFilterConfig>();
        for (const config of filterConfigs) {
            map.set(config.columnId, config);
        }
        return map;
    }, [filterConfigs]);

    const activeFilters = useMemo(() => {
        const getOptionLabel = (columnId: string, value: string): string => {
            const config = configMap.get(columnId);
            if (config?.options) {
                const option = config.options.find((o) => o.value === value);
                return option?.label ?? value;
            }
            return value;
        };

        const handleRemoveMultiValue = (
            columnId: string,
            valueToRemove: string,
            currentFilter: FilterValue,
        ) => {
            if (currentFilter.type === 'multiValue') {
                const newValues = currentFilter.values.filter(
                    (v) => v !== valueToRemove,
                );
                if (newValues.length === 0) {
                    removeColumnFilter(columnId);
                } else {
                    setColumnFilter(columnId, {
                        ...currentFilter,
                        values: newValues,
                    });
                }
            }
        };

        const filters: Array<{
            key: string;
            label: string;
            value: string;
            onRemove: () => void;
        }> = [];

        if (globalSearch) {
            filters.push({
                key: 'global-search',
                label: 'Búsqueda',
                value: globalSearch,
                onRemove: () => setGlobalSearch(''),
            });
        }

        for (const [columnId, filter] of Object.entries(columnFilters)) {
            const config = configMap.get(columnId);
            const label = config?.label ?? columnId;

            if (filter.type === 'multiValue') {
                for (const value of filter.values) {
                    filters.push({
                        key: `${columnId}-${value}`,
                        label,
                        value: getOptionLabel(columnId, value),
                        onRemove: () =>
                            handleRemoveMultiValue(columnId, value, filter),
                    });
                }
            } else if (filter.type === 'dateRange') {
                const rangeLabel = formatDateRangeLabel(filter.range);
                if (rangeLabel) {
                    filters.push({
                        key: `${columnId}-date`,
                        label,
                        value: rangeLabel,
                        onRemove: () => removeColumnFilter(columnId),
                    });
                }
            }
        }

        return filters;
    }, [
        globalSearch,
        columnFilters,
        configMap,
        removeColumnFilter,
        setColumnFilter,
        setGlobalSearch,
    ]);

    if (activeFilters.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex items-center justify-between">
                <span className="shrink-0 text-sm text-muted-foreground">
                    Filtros activos:
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-6 w-fit px-2 text-xs md:hidden"
                >
                    Limpiar filtros
                </Button>
            </div>
            <div className="flex flex-1 flex-wrap items-center gap-2">
                {activeFilters.map((filter) => (
                    <ActiveFilterBadge
                        key={filter.key}
                        label={filter.label}
                        value={filter.value}
                        onRemove={filter.onRemove}
                    />
                ))}
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="hidden h-6 w-fit px-2 text-xs md:block"
            >
                Limpiar filtros
            </Button>
        </div>
    );
}
