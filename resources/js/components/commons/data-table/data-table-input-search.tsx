import { router } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { DataTableInstance } from '@/hooks/use-data-table';
import { cleanQueryParams } from '@/lib/data-table/data-table-utils';
import { cn } from '@/lib/utils';
import type { DataTableStore } from '@/stores/data-table-store';
import type { DataTableSearchInput } from '@/types/data-table';

interface Props extends DataTableSearchInput {
    table: DataTableInstance;
}

export default function DataTableInputSearch({
    table,
    className,
    placeholder = 'Buscar...',
    enabled = true,
}: Props) {
    const { search, setSearch, route, query } = useStore(
        table,
        useShallow((s: DataTableStore) => ({
            search: s.query.search,
            setSearch: s.setSearch,
            route: s.route,
            query: s.query,
        })),
    );

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    if (!enabled) return null;

    const handleSearch = (value: string) => {
        setSearch(value);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            router.get(route, cleanQueryParams({ ...query, search: value }), {
                preserveState: true,
                preserveScroll: true,
            });
        }, 300);
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
