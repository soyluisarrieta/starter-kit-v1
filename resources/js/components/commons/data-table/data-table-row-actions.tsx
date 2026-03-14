import { MoreVerticalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { DataRow, RowAction } from '@/types/data-table';

interface DataTableRowActionsProps<TData> {
    row: DataRow<TData>;
    actions: RowAction<TData>[];
}

export function DataTableRowActions<TData>({
    row,
    actions,
}: DataTableRowActionsProps<TData>) {
    const visible = actions.filter((action) => action.visible !== false);

    if (!visible.length) return null;

    return (
        <div className="flex justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVerticalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {visible.map((action) => (
                        <DropdownMenuItem
                            key={action.label}
                            onClick={() => action.onClick(row)}
                            className={cn(
                                action.variant === 'destructive' &&
                                    'text-destructive focus:text-destructive',
                            )}
                        >
                            {action.icon && (
                                <action.icon className="mr-2 size-4" />
                            )}
                            {action.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
