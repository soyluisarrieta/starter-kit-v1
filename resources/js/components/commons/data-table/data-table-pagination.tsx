import { Link } from '@inertiajs/react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { DTable, PaginationLink } from '@/types/data-table';

interface DataTablePaginationProps {
    links: PaginationLink[];
}

export default function DataTablePagination<TData>({
    table,
    links,
}: DataTablePaginationProps & DTable<TData>) {
    const { perPage, setPerPage } = useStore(
        table,
        useShallow((s) => ({
            perPage: s.query.perPage,
            setPerPage: s.setPerPage,
        })),
    );

    const onPerPageChange = (value: string) => {
        setPerPage(value);
        table.refresh({ perPage: value });
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Label>Por Página</Label>
                <Select value={perPage} onValueChange={onPerPageChange}>
                    <SelectTrigger>
                        <SelectValue placeholder={perPage} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center justify-center gap-0.5">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url ?? '#'}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={cn(
                            'rounded border px-3 py-1 text-sm',
                            link.active
                                ? 'bg-foreground text-background'
                                : 'bg-background text-foreground',
                            !link.url && 'pointer-events-none opacity-50',
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
