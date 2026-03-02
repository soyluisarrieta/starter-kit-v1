import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { DataTableSearchInput, QueryParams } from '@/types/data-table';
import type { RouteDefinition } from '@/wayfinder';

interface DataTableInputSearchProps extends DataTableSearchInput {
    value: string;
    onValueChange: (value: string) => void;
    route: RouteDefinition<'get'>;
    queryParams: QueryParams;
}

export default function DataTableInputSearch({
    value,
    onValueChange,
    route,
    queryParams,
    className,
    placeholder = 'Buscar...',
    enabled = true,
}: DataTableInputSearchProps) {
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
        null,
    );

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchTimeout]);

    if (!enabled) return null;

    // Handle search input change
    const handleSearch = (e?: React.ChangeEvent<HTMLInputElement>) => {
        const inputSearch = e?.target.value ?? '';
        onValueChange(inputSearch);

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        const newSearchTimeout = setTimeout(() => {
            const queryString = {
                ...queryParams,
                search: inputSearch,
            };
            router.get(route, queryString, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 300);

        setSearchTimeout(newSearchTimeout);
    };

    return (
        <div className={cn('flex max-w-60 items-center gap-2', className)}>
            <Input
                id="search"
                type="text"
                name="search"
                placeholder={placeholder}
                value={value}
                onChange={handleSearch}
            />
            {value && (
                <Button
                    className="px-0 text-xs text-muted-foreground"
                    variant="link"
                    size="sm"
                    onClick={() => handleSearch()}
                >
                    Limpiar
                </Button>
            )}
        </div>
    );
}
