import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebouncedFn } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';
import { useDataTableContext } from './data-table-context';
import type { DataTableSearchOptions } from './types';

export default function DataTableInputSearch({
    className,
    placeholder = 'Buscar...',
}: DataTableSearchOptions) {
    const { search, setSearch, refresh } = useDataTableContext((s) => ({
        search: s.query.search,
        setSearch: s.setSearch,
        refresh: s.refresh,
    }));

    const debouncedRefresh = useDebouncedFn((value: string) =>
        refresh({ search: value }),
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
