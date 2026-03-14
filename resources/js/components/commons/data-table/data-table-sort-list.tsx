import {
    ChevronDownIcon,
    ChevronUpIcon,
    ChevronsUpDownIcon,
} from 'lucide-react';
import { useDataTableContext } from '@/components/commons/data-table/data-table-context';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface DataTableSortListProps {
    field?: string;
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

    if (!field) return <>{children}</>;

    const isActive = sortBy === field;
    const isAsc = isActive && sortOrder === 'asc';
    const isDesc = isActive && sortOrder === 'desc';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className={cn(
                        'inline-flex cursor-pointer items-center space-x-2 text-xs font-bold select-none',
                        isActive && 'text-primary',
                    )}
                >
                    <div>{children}</div>

                    {isActive ? (
                        isAsc ? (
                            <ChevronUpIcon className="size-4" />
                        ) : (
                            <ChevronDownIcon className="size-4" />
                        )
                    ) : (
                        <ChevronsUpDownIcon className="size-4" />
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem
                    className={cn(isAsc && 'text-primary')}
                    onClick={() => refresh({ sortBy: field, sortOrder: 'asc' })}
                >
                    <ChevronUpIcon className="size-4" />
                    Ascendente
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={cn(isDesc && 'text-primary')}
                    onClick={() =>
                        refresh({ sortBy: field, sortOrder: 'desc' })
                    }
                >
                    <ChevronDownIcon className="size-4" />
                    Descendente
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
