import {
    ArrowDownUpIcon,
    ArrowDownWideNarrowIcon,
    ArrowUpWideNarrowIcon,
} from 'lucide-react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
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
    const { sortBy, sortOrder } = useStore(
        table,
        useShallow((s) => ({
            sortBy: s.query.sortBy,
            sortOrder: s.query.sortOrder,
        })),
    );

    const isActive = sortBy === field;
    const isAsc = isActive && (sortOrder || 'desc') === 'asc';

    const onSort = () => {
        table.refresh({
            sortBy: field,
            sortOrder: isAsc ? 'desc' : 'asc',
        });
    };

    return (
        <div
            className={cn(
                'inline-flex cursor-pointer items-center space-x-2 text-xs font-bold select-none',
                isActive && 'text-primary',
            )}
            onClick={onSort}
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
        </div>
    );
}
