import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { DataTableSearchOptions } from '@/components/commons/data-table/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebouncedFn } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';
import type { DTable } from '@/types/data-table';

export default function DataTableInputSearch<TData>({
    table,
    className,
    placeholder = 'Buscar...',
}: DataTableSearchOptions & DTable<TData>) {
    const { search, setSearch } = useStore(
        table,
        useShallow((s) => ({
            search: s.query.search,
            setSearch: s.setSearch,
        })),
    );

    const debouncedRefresh = useDebouncedFn((value: string) =>
        table.refresh({ search: value }),
    );

    const handleSearch = (value: string) => {
        setSearch(value);
        debouncedRefresh(value);
    };

    return (
        <div className={cn('flex max-w-60 items-center gap-2', className)}>
            <Input
                id="search"
                type="text"
                name="search"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={placeholder}
            />
            {search && (
                <Button
                    variant="link"
                    size="sm"
                    onClick={() => handleSearch('')}
                >
                    Limpiar
                </Button>
            )}
        </div>
    );
}
