import {
    ChevronDownIcon,
    ChevronUpIcon,
    ChevronsUpDownIcon,
    EyeOffIcon,
} from 'lucide-react';
import { useDataTableContext } from '@/components/commons/data-table/data-table-context';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface DataTableSortListProps {
    columnId: string;
    field?: string;
    children: React.ReactNode;
}

export default function DataTableSortList({
    columnId,
    field,
    children,
}: DataTableSortListProps) {
    const { sortBy, sortOrder, refresh, hideColumn } = useDataTableContext(
        (s) => ({
            sortBy: s.query.sortBy,
            sortOrder: s.query.sortOrder,
            refresh: s.refresh,
            hideColumn: s.hideColumn,
        }),
    );

    const sortable = Boolean(field);
    const isActive = sortable && sortBy === field;
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

                    {sortable &&
                        (isActive ? (
                            isAsc ? (
                                <ChevronUpIcon className="size-4" />
                            ) : (
                                <ChevronDownIcon className="size-4" />
                            )
                        ) : (
                            <ChevronsUpDownIcon className="size-4" />
                        ))}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {sortable && (
                    <>
                        <DropdownMenuItem
                            className={cn(isAsc && 'text-primary')}
                            onClick={() =>
                                refresh({
                                    sortBy: field,
                                    sortOrder: 'asc',
                                })
                            }
                        >
                            <ChevronUpIcon className="size-4" />
                            Ascendente
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={cn(isDesc && 'text-primary')}
                            onClick={() =>
                                refresh({
                                    sortBy: field,
                                    sortOrder: 'desc',
                                })
                            }
                        >
                            <ChevronDownIcon className="size-4" />
                            Descendente
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuItem onClick={() => hideColumn(columnId)}>
                    <EyeOffIcon className="size-4" />
                    Ocultar columna
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
