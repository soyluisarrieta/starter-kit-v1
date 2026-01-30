import type { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, EyeOff } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useDataTableStore } from '@/stores/data-table-store';

interface DataTableColumnHeaderProps<TData, TValue> {
    column: Column<TData, TValue>;
    children: ReactNode;
    className?: string;
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    className,
    children,
}: DataTableColumnHeaderProps<TData, TValue>) {
    const sorting = useDataTableStore((state) => state.sorting);

    if (!column.getCanSort()) {
        return <div className={cn(className)}>{children}</div>;
    }

    const sorted = sorting.find((s) => s.id === column.id)?.desc;

    return (
        <div className={cn('flex items-center gap-2', className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={sorted === undefined ? 'ghost' : 'secondary'}
                        size="sm"
                        className="-ml-3 data-[state=open]:bg-accent"
                    >
                        <span className="text-xs tracking-wide text-muted-foreground">
                            {children}
                        </span>
                        {sorted === true ? (
                            <ArrowDown className="ml-2 size-4" />
                        ) : sorted === false ? (
                            <ArrowUp className="ml-2 size-4" />
                        ) : (
                            <ArrowUpDown className="ml-2 size-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem
                        onClick={() => column.toggleSorting(false)}
                    >
                        <ArrowUp className="mr-2 size-4 text-muted-foreground" />
                        Ascendente
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => column.toggleSorting(true)}
                    >
                        <ArrowDown className="mr-2 size-4 text-muted-foreground" />
                        Descendente
                    </DropdownMenuItem>
                    {column.getCanHide() && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => column.toggleVisibility(false)}
                            >
                                <EyeOff className="mr-2 size-4 text-muted-foreground" />
                                Ocultar
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
