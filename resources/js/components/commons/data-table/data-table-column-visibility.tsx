import { ColumnsIcon } from 'lucide-react';
import { useDataTableContext } from '@/components/commons/data-table/data-table-context';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ColumnDef } from '@/types/data-table';

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

    const visibleCount = columns.length - hiddenColumns.size;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <ColumnsIcon className="size-4" />
                    Columnas
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {columns.map((column) => {
                    const colId = 'key' in column ? column.key : column.id;
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
