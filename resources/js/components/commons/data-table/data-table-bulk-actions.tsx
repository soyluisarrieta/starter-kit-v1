import {
    Trash2Icon,
    XIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDataTableContext } from './data-table-context';
import type { BulkActionsConfig } from './types';

interface DataTableBulkActionsProps {
    config: BulkActionsConfig;
}

export function DataTableBulkActions({ config }: DataTableBulkActionsProps) {
    const { selected, clearSelected } = useDataTableContext((s) => ({
        selected: s.selected,
        clearSelected: s.clearSelected,
    }));

    const count = selected.size;
    if (count === 0) return null;

    const selectedIds = Array.from(selected.keys());

    const handleDelete = () => {
        if (!config.delete) return;
        config.delete(selectedIds);
    };

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-lg border bg-background p-2 shadow-lg">
                <span className="px-2 text-sm font-medium tabular-nums">
                    ({count}) seleccionado{count !== 1 ? 's' : ''}
                </span>

                <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    onClick={clearSelected}
                >
                    <XIcon className="size-4" />
                </Button>

                <div className="mx-2 h-4 w-px bg-border" />

                {config.delete !== false && config.delete && (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                    >
                        <Trash2Icon className="size-4" />
                        Eliminar
                    </Button>
                )}

                {config.actions?.map((action, i) => (
                    <Button
                        key={i}
                        variant={action.variant ?? 'outline'}
                        size="sm"
                        onClick={() => {
                            action.onClick(selectedIds);
                            clearSelected();
                        }}
                    >
                        {action.icon && <action.icon className="size-4" />}
                        {action.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}
