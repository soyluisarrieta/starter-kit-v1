import {
    DownloadIcon,
    FileIcon,
    FileJsonIcon,
    FileSpreadsheetIcon,
    FileTextIcon,
    Trash2Icon,
    XIcon,
} from 'lucide-react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { exportData } from '@/lib/data-table/data-table-export';
import type { BulkActionsConfig, DataTableInstance } from '@/types/data-table';

interface DataTableBulkActionsProps<TData> {
    table: DataTableInstance<TData>;
    config: BulkActionsConfig;
}

type ExportFormat = 'PDF' | 'CSV' | 'XLS' | 'JSON';

export function DataTableBulkActions<TData>({
    table,
    config,
}: DataTableBulkActionsProps<TData>) {
    const { selected, clearSelected } = useStore(
        table,
        useShallow((s) => ({
            selected: s.selected,
            clearSelected: s.clearSelected,
        })),
    );

    const count = selected.size;
    if (count === 0) return null;

    const selectedIds = Array.from(selected.keys());

    const handleExport = (format: ExportFormat) => {
        if (!config.export) return;
        const { columns, filename } = config.export;
        const selectedData = Array.from(selected.values());
        exportData(format, selectedData, { columns, filename });
        clearSelected();
    };

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

                {config.export !== false && config.export && (
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="sm">
                                <DownloadIcon className="size-4" />
                                Exportar
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" side="top">
                            <DropdownMenuItem
                                onClick={() => handleExport('CSV')}
                            >
                                <FileTextIcon className="size-4" />
                                CSV
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleExport('XLS')}
                            >
                                <FileSpreadsheetIcon className="size-4" />
                                Excel
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleExport('PDF')}
                            >
                                <FileIcon className="size-4" />
                                PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleExport('JSON')}
                            >
                                <FileJsonIcon className="size-4" />
                                JSON
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

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
