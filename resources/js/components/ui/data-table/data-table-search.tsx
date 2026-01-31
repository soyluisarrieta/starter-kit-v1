import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDataTableStore } from '@/stores/data-table-store';

interface DataTableSearchProps {
    placeholder?: string;
    debounceMs?: number;
}

export function DataTableSearch({
    placeholder = 'Buscar...',
    debounceMs = 300,
}: DataTableSearchProps) {
    const globalSearch = useDataTableStore(
        (state) => state.filters.globalSearch,
    );
    const setGlobalSearch = useDataTableStore((state) => state.setGlobalSearch);

    const [localValue, setLocalValue] = useState(globalSearch);

    useEffect(() => {
        setLocalValue(globalSearch);
    }, [globalSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (localValue !== globalSearch) {
                setGlobalSearch(localValue);
            }
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [localValue, debounceMs, globalSearch, setGlobalSearch]);

    const handleClear = () => {
        setLocalValue('');
        setGlobalSearch('');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
    };

    return (
        <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder={placeholder}
                value={localValue}
                onChange={handleChange}
                className="w-full pr-9 pl-9 md:w-64"
            />
            {localValue && (
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleClear}
                    className="absolute right-1 size-7"
                    aria-label="Limpiar búsqueda"
                >
                    <X className="size-4" />
                </Button>
            )}
        </div>
    );
}
