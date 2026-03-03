import { Link } from '@inertiajs/react';
import {
    ArrowDownUpIcon,
    ArrowDownWideNarrowIcon,
    ArrowUpWideNarrowIcon,
} from 'lucide-react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { cleanQueryParams } from '@/lib/data-table/data-table-utils';
import { cn } from '@/lib/utils';
import type { DTable } from '@/types/data-table';

interface DataTableSortListProps {
    field: string;
    children: React.ReactNode;
}

export default function DataTableSortList<TData>({
    table,
    field,
    children,
}: DataTableSortListProps & DTable<TData>) {
    const { sortBy, sortOrder, route, query } = useStore(
        table,
        useShallow((s) => ({
            sortBy: s.query.sortBy,
            sortOrder: s.query.sortOrder,
            route: s.route,
            query: s.query,
        })),
    );

    const isActive = sortBy === field;
    const isAsc = isActive && (sortOrder || 'desc') === 'asc';

    return (
        <Link
            className={cn(
                'inline-flex items-center space-x-2 text-xs font-bold',
                isActive && 'text-primary',
            )}
            href={route}
            data={cleanQueryParams({
                ...query,
                sortBy: field,
                sortOrder: isAsc ? 'desc' : 'asc',
            })}
            preserveState
            preserveScroll
        >
            <div>{children}</div>

            {isActive ? (
                isAsc ? (
                    <ArrowDownWideNarrowIcon className="size-4" />
                ) : (
                    <ArrowUpWideNarrowIcon className="size-4" />
                )
            ) : (
                <ArrowDownUpIcon className="size-4" />
            )}
        </Link>
    );
}
