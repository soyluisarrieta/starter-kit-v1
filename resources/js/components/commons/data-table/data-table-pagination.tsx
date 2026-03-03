import { Link, router } from '@inertiajs/react';
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
import type { DataTableInstance } from '@/hooks/use-data-table';
import { cleanQueryParams } from '@/lib/data-table/data-table-utils';
import { cn } from '@/lib/utils';
import type { DataTableStore } from '@/stores/data-table-store';
import type { PaginationLink } from '@/types/data-table';

interface Props {
    table: DataTableInstance;
    links: PaginationLink[];
}

export default function DataTablePagination({ table, links }: Props) {
    const { perPage, setPerPage, route, query } = useStore(
        table,
        useShallow((s: DataTableStore) => ({
            perPage: s.query.perPage,
            setPerPage: s.setPerPage,
            route: s.route,
            query: s.query,
        })),
    );

    const onPerPageChange = (value: string) => {
        setPerPage(value);

        router.get(route, cleanQueryParams({ ...query, perPage: value }), {
            preserveState: true,
            preserveScroll: true,
        });
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
