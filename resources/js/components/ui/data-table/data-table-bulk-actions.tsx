import type { Table } from '@tanstack/react-table';
import {
    Download,
    FileJson,
    FileSpreadsheet,
    FileText,
    Trash2,
} from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { exportData } from '@/lib/data-table/data-table-export';
import { useDataTableStore } from '@/stores/data-table-store';
import type { DataTableBulkAction, ExportFormat } from '@/types/data-table';

interface DataTableBulkActionsProps<TData extends object> {
    table: Table<TData>;
    data: TData[];
    customActions?: DataTableBulkAction<TData>[];
    onDelete?: (rows: TData[]) => void;
    enableExport?: boolean;
    exportFilename?: string;
}

export function DataTableBulkActions<TData extends object>({
    table,
    data,
    customActions = [],
    onDelete,
    enableExport = true,
    exportFilename = 'datos',
}: DataTableBulkActionsProps<TData>) {
    const rowSelection = useDataTableStore((state) => state.rowSelection);
    const setRowSelection = useDataTableStore((state) => state.setRowSelection);

    const selectedRows = useMemo(() => {
        const selectedIndices = Object.keys(rowSelection).filter(
            (key) => rowSelection[key],
        );
        return selectedIndices
            .map((index) => data[Number(index)])
            .filter(Boolean);
    }, [rowSelection, data]);

    const countSelection = selectedRows.length;
    const hasSelection = countSelection > 0;
    const plural = countSelection > 1 ? 's' : '';

    const exportColumns = useMemo(() => {
        return table
            .getAllColumns()
            .filter((col) => col.id !== 'select' && col.id !== 'actions')
            .map((col) => ({
                id: col.id,
                header:
                    typeof col.columnDef.header === 'string'
                        ? col.columnDef.header
                        : col.id,
            }));
    }, [table]);

    const handleExport = (format: ExportFormat) => {
        const dataToExport = hasSelection ? selectedRows : data;
        exportData(format, dataToExport, {
            filename: exportFilename,
            columns: exportColumns,
        });
    };

    const handleDelete = () => {
        if (onDelete && selectedRows.length > 0) {
            onDelete(selectedRows);
            setRowSelection({});
        }
    };

    const handleClearSelection = () => {
        setRowSelection({});
    };

    return (
        <div className="flex items-center gap-2">
            {enableExport && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 bg-transparent"
                        >
                            <Download className="size-4 xl:mr-2" />
                            <span className="hidden xl:block">Exportar</span>
                            {hasSelection && `(${countSelection})`}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleExport('pdf')}>
                            <FileText className="mr-2 size-4" />
                            Exportar a PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport('csv')}>
                            <FileText className="mr-2 size-4" />
                            Exportar a CSV
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport('excel')}>
                            <FileSpreadsheet className="mr-2 size-4" />
                            Exportar a Excel
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport('json')}>
                            <FileJson className="mr-2 size-4" />
                            Exportar a JSON
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            disabled
                            className="text-xs text-muted-foreground"
                        >
                            Exportando{' '}
                            {countSelection
                                ? `${countSelection} fila${plural}`
                                : 'todo'}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            {hasSelection && (
                <div className="fixed bottom-0 left-1/2 z-10 flex -translate-1/2 items-center gap-2 rounded-md border border-muted bg-muted/40 p-2 backdrop-blur-xl">
                    <span className="px-2 text-sm text-muted-foreground">
                        {countSelection} seleccionado{plural}
                    </span>

                    {customActions.map((action, index) => (
                        <Button
                            key={`custom-${action.label}-${index}`}
                            variant={
                                action.variant === 'destructive'
                                    ? 'destructive'
                                    : 'secondary'
                            }
                            size="sm"
                            onClick={() => action.onClick(selectedRows)}
                            className="h-8"
                        >
                            {action.icon}
                            {action.label}
                        </Button>
                    ))}

                    {onDelete && (
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleDelete}
                            className="h-8"
                        >
                            <Trash2 className="size-4" />
                            Eliminar
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearSelection}
                        className="h-8"
                    >
                        Cancelar
                    </Button>
                </div>
            )}
        </div>
    );
}
