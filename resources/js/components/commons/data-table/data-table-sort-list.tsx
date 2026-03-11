import {
    ArrowDownUpIcon,
    ArrowDownWideNarrowIcon,
    ArrowUpWideNarrowIcon,
} from 'lucide-react';
import { useDataTableContext } from '@/components/commons/data-table/data-table-context';
import { cn } from '@/lib/utils';

interface DataTableSortListProps {
    field: string;
    children: React.ReactNode;
}

export default function DataTableSortList({
    field,
    children,
}: DataTableSortListProps) {
    const { sortBy, sortOrder, refresh } = useDataTableContext((s) => ({
        sortBy: s.query.sortBy,
        sortOrder: s.query.sortOrder,
        refresh: s.refresh,
    }));

    const isActive = sortBy === field;
    const isAsc = isActive && (sortOrder || 'desc') === 'asc';

    const onSort = () => {
        refresh({
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
