import { useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { DataTableSearchOptions } from '@/components/commons/data-table/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

    // Timeout for debounce
    const timeoutRef = useRef<NodeJS.Timeout>(null);
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // Handle search with debounce
    const handleSearch = (value: string) => {
        setSearch(value);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            table.refresh({ search: value });
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
