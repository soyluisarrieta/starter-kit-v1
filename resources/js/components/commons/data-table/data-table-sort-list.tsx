import { Link } from '@inertiajs/react';
import {
    ArrowDownUpIcon,
    ArrowDownWideNarrowIcon,
    ArrowUpWideNarrowIcon,
} from 'lucide-react';
import { cleanQueryParams } from '@/lib/data-table/data-table-utils';
import { cn } from '@/lib/utils';
import type { QueryParams } from '@/types/data-table';
import type { RouteDefinition } from '@/wayfinder';

interface DataTableSortListProps {
    queryParams: QueryParams;
    route: RouteDefinition<'get'>;
    field: string;
    children: React.ReactNode;
}

export default function DataTableSortList({
    queryParams,
    route,
    field,
    children,
}: DataTableSortListProps) {
    const isActived = queryParams.sortBy === field;
    const isSortAsc = isActived && (queryParams.sortOrder || 'desc') === 'asc';

    return (
        <>
            <Link
                className={cn(
                    'flex items-center space-x-2 text-xs font-bold',
                    isActived && 'text-primary',
                )}
                href={route}
                data={cleanQueryParams({
                    ...queryParams,
                    sortBy: field,
                    sortOrder: isSortAsc ? 'desc' : 'asc',
                })}
            >
                <div>{children}</div>
                {isActived ? (
                    isSortAsc ? (
                        <ArrowDownWideNarrowIcon className="size-4" />
                    ) : (
                        <ArrowUpWideNarrowIcon className="size-4" />
                    )
                ) : (
                    <ArrowDownUpIcon className="size-4" />
                )}
            </Link>
        </>
    );
}
