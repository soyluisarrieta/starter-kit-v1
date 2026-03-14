import { ColumnsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDataTableContext } from './data-table-context';
import { getColumnId } from './lib/column-helpers';
import type { ColumnDef } from './types';

interface DataTableColumnVisibilityProps<TData> {
    columns: ColumnDef<TData>[];
}

export default function DataTableColumnVisibility<TData>({
    columns,
}: DataTableColumnVisibilityProps<TData>) {
    const { hiddenColumns, toggleColumn } = useDataTableContext((s) => ({
        hiddenColumns: s.hiddenColumns,
        toggleColumn: s.toggleColumn,
    }));

    const hideableColumns = columns.filter((c) => c.hideable !== false);
    const visibleCount = hideableColumns.length - hiddenColumns.size;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <ColumnsIcon className="size-4" />
                    Columnas
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {hideableColumns.map((column) => {
                    const colId = getColumnId(column);
                    const label = column.label ?? colId;
                    const isVisible = !hiddenColumns.has(colId);
                    const isLastVisible = isVisible && visibleCount === 1;

                    return (
                        <DropdownMenuCheckboxItem
                            key={colId}
                            checked={isVisible}
                            disabled={isLastVisible}
                            onCheckedChange={() => toggleColumn(colId)}
                        >
                            {label}
                        </DropdownMenuCheckboxItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
