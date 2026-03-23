import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { DataTableHeaderCheckbox } from './data-table-checkbox';
import DataTableSortList from './data-table-sort-list';
import { getColumnId } from './lib/column-helpers';
import type { BaseRow, ColumnDef } from './types';

interface DataTableHeadProps<TData> {
    visibleColumns: ColumnDef<TData>[];
    selectable: boolean;
    pageRows: BaseRow[];
    hideableVisibleCount: number;
}

export default function DataTableHead<TData>({
    visibleColumns,
    selectable,
    pageRows,
    hideableVisibleCount,
}: DataTableHeadProps<TData>) {
    return (
        <TableHeader>
            <TableRow
                className="border-0! [&>th]:first:rounded-l-lg [&>th]:last:rounded-r-lg"
                style={{ fontSize: '0.8rem' }}
            >
                {selectable && (
                    <TableHead className="w-px bg-muted px-4">
                        <DataTableHeaderCheckbox pageRows={pageRows} />
                    </TableHead>
                )}
                {visibleColumns.map((column) => {
                    const colId = getColumnId(column);
                    return (
                        <TableHead
                            key={colId}
                            className={cn(
                                'bg-muted px-4 font-bold text-muted-foreground',
                                column.fit && 'w-px',
                                column.sticky && 'sticky right-0 z-10',
                                column.className,
                            )}
                            style={{ textAlign: column.align }}
                        >
                            <DataTableSortList
                                columnId={colId}
                                field={'key' in column ? column.key : undefined}
                                totalColumns={hideableVisibleCount}
                                hideable={column.hideable !== false}
                            >
                                {column.header?.() ?? column.label}
                            </DataTableSortList>
                        </TableHead>
                    );
                })}
            </TableRow>
        </TableHeader>
    );
}
