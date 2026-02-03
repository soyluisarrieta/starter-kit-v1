import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, Check, Filter, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { getActiveFilterCount } from '@/lib/data-table/data-table-filters';
import { cn } from '@/lib/utils';
import {
    useDataTableStore,
    createMultiValueFilter,
    createDateRangeFilter,
} from '@/stores/data-table-store';
import type { ColumnFilterConfig, DateRange } from '@/types/data-table';

interface MultiValueFilterProps {
    config: ColumnFilterConfig;
    inDrawer?: boolean;
}

export function MultiValueFilter({
    config,
    inDrawer = false,
}: MultiValueFilterProps) {
    const columnFilters = useDataTableStore(
        (state) => state.filters.columnFilters,
    );
    const setColumnFilter = useDataTableStore((state) => state.setColumnFilter);
    const removeColumnFilter = useDataTableStore(
        (state) => state.removeColumnFilter,
    );

    const currentFilter = columnFilters[config.columnId];
    const selectedValues = useMemo(() => {
        if (currentFilter?.type === 'multiValue') {
            return currentFilter.values;
        }
        return [];
    }, [currentFilter]);

    const handleSelect = (value: string) => {
        const newValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];

        if (newValues.length === 0) {
            removeColumnFilter(config.columnId);
        } else {
            setColumnFilter(
                config.columnId,
                createMultiValueFilter(config.columnId, newValues),
            );
        }
    };

    const handleClear = () => {
        removeColumnFilter(config.columnId);
    };

    const options = config.options ?? [];

    if (inDrawer) {
        return (
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{config.label}</span>
                    {selectedValues.length > 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClear}
                            className="h-6 px-2 text-xs"
                        >
                            Limpiar
                        </Button>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    {options.map((option) => {
                        const isSelected = selectedValues.includes(
                            option.value,
                        );
                        return (
                            <Badge
                                key={option.value}
                                variant={isSelected ? 'default' : 'outline'}
                                className="cursor-pointer px-3 py-2"
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                            </Badge>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-dashed bg-transparent"
                >
                    <Filter className="mr-2 size-4" />
                    {config.label}
                    {selectedValues.length > 0 && (
                        <>
                            <span className="mx-2 h-4 w-px bg-border" />
                            <Badge
                                variant="secondary"
                                className="px-1 font-normal"
                            >
                                {selectedValues.length}
                            </Badge>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder={`Buscar ${config.label.toLowerCase()}...`}
                    />
                    <CommandList>
                        <CommandEmpty>Sin resultados.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.includes(
                                    option.value,
                                );
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() =>
                                            handleSelect(option.value)
                                        }
                                    >
                                        <div
                                            className={cn(
                                                'mr-2 flex size-4 items-center justify-center rounded-sm border border-primary',
                                                isSelected
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'opacity-50 [&_svg]:invisible',
                                            )}
                                        >
                                            <Check className="size-3" />
                                        </div>
                                        {option.label}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
                {selectedValues.length > 0 && (
                    <div className="border-t p-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClear}
                            className="w-full justify-center text-xs"
                        >
                            Limpiar filtro
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}

interface DateRangeFilterProps {
    config: ColumnFilterConfig;
    inDrawer?: boolean;
}

export function DateRangeFilter({
    config,
    inDrawer = false,
}: DateRangeFilterProps) {
    const columnFilters = useDataTableStore(
        (state) => state.filters.columnFilters,
    );
    const setColumnFilter = useDataTableStore((state) => state.setColumnFilter);
    const removeColumnFilter = useDataTableStore(
        (state) => state.removeColumnFilter,
    );

    const currentFilter = columnFilters[config.columnId];
    const dateRange: DateRange = useMemo(() => {
        if (currentFilter?.type === 'dateRange') {
            return currentFilter.range;
        }
        return { from: undefined, to: undefined };
    }, [currentFilter]);

    const handleSelect = (range: DateRange | undefined) => {
        if (!range || (!range.from && !range.to)) {
            removeColumnFilter(config.columnId);
        } else {
            setColumnFilter(
                config.columnId,
                createDateRangeFilter(config.columnId, range),
            );
        }
    };

    const handleClear = () => {
        removeColumnFilter(config.columnId);
    };

    const hasValue = dateRange.from || dateRange.to;

    const formatDateRange = (range: DateRange): string => {
        if (range.from && range.to) {
            return `${format(range.from, 'dd/MM/yy', { locale: es })} - ${format(range.to, 'dd/MM/yy', { locale: es })}`;
        }
        if (range.from) {
            return `Desde ${format(range.from, 'dd/MM/yy', { locale: es })}`;
        }
        if (range.to) {
            return `Hasta ${format(range.to, 'dd/MM/yy', { locale: es })}`;
        }
        return config.label;
    };

    if (inDrawer) {
        return (
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{config.label}</span>
                    {hasValue && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClear}
                            className="h-6 px-2 text-xs"
                        >
                            Limpiar
                        </Button>
                    )}
                </div>
                {hasValue && (
                    <p className="text-sm text-muted-foreground">
                        {formatDateRange(dateRange)}
                    </p>
                )}
                <Calendar
                    mode="range"
                    selected={
                        dateRange.from
                            ? { from: dateRange.from, to: dateRange.to }
                            : undefined
                    }
                    onSelect={(range) =>
                        handleSelect(
                            range
                                ? { from: range.from, to: range.to }
                                : undefined,
                        )
                    }
                    numberOfMonths={1}
                    locale={es}
                    className="w-full min-w-fit rounded-md border"
                />
            </div>
        );
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-dashed bg-transparent"
                >
                    <CalendarIcon className="mr-2 size-4" />
                    {hasValue ? formatDateRange(dateRange) : config.label}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="range"
                    selected={
                        dateRange.from
                            ? { from: dateRange.from, to: dateRange.to }
                            : undefined
                    }
                    onSelect={(range) =>
                        handleSelect(
                            range
                                ? { from: range.from, to: range.to }
                                : undefined,
                        )
                    }
                    numberOfMonths={2}
                    locale={es}
                />
                {hasValue && (
                    <div className="border-t p-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClear}
                            className="w-full justify-center text-xs"
                        >
                            Limpiar fecha
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}

interface FilterContentProps {
    configs: ColumnFilterConfig[];
    inDrawer?: boolean;
}

function FilterContent({ configs, inDrawer = false }: FilterContentProps) {
    return (
        <div
            className={cn(
                inDrawer
                    ? 'mx-auto max-w-sm space-y-6'
                    : 'flex flex-wrap items-center gap-2',
            )}
        >
            {configs.map((config) => {
                switch (config.type) {
                    case 'multiValue':
                        return (
                            <MultiValueFilter
                                key={config.columnId}
                                config={config}
                                inDrawer={inDrawer}
                            />
                        );
                    case 'dateRange':
                        return (
                            <DateRangeFilter
                                key={config.columnId}
                                config={config}
                                inDrawer={inDrawer}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}

interface DataTableFiltersProps {
    configs: ColumnFilterConfig[];
}

export function DataTableFilters({ configs }: DataTableFiltersProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const columnFilters = useDataTableStore(
        (state) => state.filters.columnFilters,
    );
    const clearAllFilters = useDataTableStore((state) => state.clearAllFilters);

    const filterCount = useMemo(
        () => getActiveFilterCount(columnFilters),
        [columnFilters],
    );

    if (configs.length === 0) return null;

    return (
        <>
            {/* Desktop filters - hidden on small/medium screens */}
            <div className="hidden lg:flex lg:flex-wrap lg:items-center lg:gap-2">
                <FilterContent configs={configs} />
            </div>

            {/* Mobile/Tablet filter button with drawer - visible on small/medium screens */}
            <div className="lg:hidden">
                <Drawer
                    open={drawerOpen}
                    onOpenChange={setDrawerOpen}
                    autoFocus={drawerOpen}
                >
                    <DrawerTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 bg-transparent"
                        >
                            <SlidersHorizontal className="mr-2 size-4" />
                            Filtros
                            {filterCount > 0 && (
                                <>
                                    <span className="mx-2 h-4 w-px bg-border" />
                                    <Badge
                                        variant="secondary"
                                        className="px-1.5 font-normal"
                                    >
                                        {filterCount}
                                    </Badge>
                                </>
                            )}
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent
                        className="mx-auto max-w-lg"
                        aria-describedby={undefined}
                    >
                        <DrawerHeader>
                            <DrawerTitle>Filtros</DrawerTitle>
                            <DrawerDescription>
                                Refine los resultados de la tabla
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="mx-auto max-h-[60dvh] w-full overflow-y-auto px-4 pb-4">
                            <FilterContent configs={configs} inDrawer />
                        </div>
                        <DrawerFooter className="flex-row gap-2">
                            {filterCount > 0 && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        clearAllFilters();
                                    }}
                                    className="flex-1"
                                >
                                    Limpiar filtros
                                </Button>
                            )}
                            <DrawerClose asChild>
                                <Button className="flex-1">Aplicar</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
}
