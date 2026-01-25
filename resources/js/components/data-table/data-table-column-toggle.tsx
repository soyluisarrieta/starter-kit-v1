import type { Table } from '@tanstack/react-table';
import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDataTableStore } from '@/stores/data-table-store';

interface DataTableColumnToggleProps<TData> {
    table: Table<TData>;
}

export function DataTableColumnToggle<TData>({
    table,
}: DataTableColumnToggleProps<TData>) {
    const columnVisibility = useDataTableStore(
        (state) => state.columnVisibility,
    );
    const setColumnVisibility = useDataTableStore(
        (state) => state.setColumnVisibility,
    );

    const columns = table
        .getAllColumns()
        .filter((column) => column.getCanHide());

    const handleCheckedChange = (columnId: string, value: boolean) => {
        setColumnVisibility({
            ...columnVisibility,
            [columnId]: value,
        });
    };

    if (columns.length === 0) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 bg-transparent"
                >
                    <Settings2 className="size-4 xl:mr-2" />
                    <span className="hidden xl:block">Columnas</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {columns.map((column) => {
                    const header = column.columnDef.header;
                    const displayName =
                        typeof header === 'string' ? header : column.id;

                    return (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            checked={columnVisibility[column.id] !== false}
                            onCheckedChange={(value) =>
                                handleCheckedChange(column.id, value)
                            }
                        >
                            {displayName}
                        </DropdownMenuCheckboxItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
