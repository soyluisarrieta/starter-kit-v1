import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { DataTableRowAction } from '@/types/data-table';

interface DataTableRowActionsProps<TData extends object> {
    row: TData;
    actions: DataTableRowAction<TData>[];
}

export function DataTableRowActions<TData extends object>({
    row,
    actions,
}: DataTableRowActionsProps<TData>) {
    if (actions.length === 0) return null;

    const defaultActions = actions.filter((a) => a.variant !== 'destructive');
    const destructiveActions = actions.filter(
        (a) => a.variant === 'destructive',
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon-sm"
                    className="data-[state=open]:bg-muted"
                >
                    <MoreHorizontal className="size-4" />
                    <span className="sr-only">Abrir menú</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                {defaultActions.map((action, index) => (
                    <DropdownMenuItem
                        key={`action-${action.label}-${index}`}
                        onClick={() => action.onClick(row)}
                    >
                        {action.icon}
                        {action.label}
                    </DropdownMenuItem>
                ))}
                {defaultActions.length > 0 && destructiveActions.length > 0 && (
                    <DropdownMenuSeparator />
                )}
                {destructiveActions.map((action, index) => (
                    <DropdownMenuItem
                        key={`destructive-${action.label}-${index}`}
                        variant="destructive"
                        onClick={() => action.onClick(row)}
                    >
                        {action.icon}
                        {action.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
