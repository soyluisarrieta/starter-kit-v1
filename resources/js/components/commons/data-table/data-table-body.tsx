import { InboxIcon } from 'lucide-react';
import {
    TableBody,
    TableCell,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { DataTableRowCheckbox } from './data-table-checkbox';
import { getColumnId } from './lib/column-helpers';
import type { ColumnDef, DataRow } from './types';

interface DataTableBodyProps<TData> {
    rows: DataRow<TData>[];
    visibleColumns: ColumnDef<TData>[];
    selectable: boolean;
    emptyMessage?: string;
}

export default function DataTableBody<TData>({
    rows,
    visibleColumns,
    selectable,
}: DataTableBodyProps<TData>) {
    if (rows.length === 0) {
        const colSpan = visibleColumns.length + (selectable ? 1 : 0);
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={colSpan} className="text-center text-muted-foreground/70 py-10">
                        <div className='flex flex-col justify-center items-center pointer-events-none select-none'>
                            <InboxIcon className='size-16 opacity-80' strokeWidth={0.4} />
                            <p className='font-light'>Sin resultados</p>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    return (
        <TableBody>
            {rows.map((row, index) => (
                <TableRow key={index} className="group">
                    {selectable && (
                        <TableCell className="w-px px-4 bg-background/97 group-hover:bg-muted/50">
                            <DataTableRowCheckbox row={row} />
                        </TableCell>
                    )}
                    {visibleColumns.map((column) => {
                        const colId = getColumnId(column);
                        return (
                            <TableCell
                                key={colId}
                                className={cn(
                                    'bg-background/97 px-4 group-hover:bg-muted/50',
                                    column.fit && 'w-px',
                                    column.sticky &&
                                    'sticky right-0 group-hover:bg-background/90 before:absolute before:inset-0 before:-z-10 group-hover:before:bg-muted/50',
                                    column.className,
                                )}
                                style={{ textAlign: column.align }}
                            >
                                {'key' in column
                                    ? (column.cell?.({ row }) ??
                                        String(row[column.key]))
                                    : column.cell({ row })}
                            </TableCell>
                        );
                    })}
                </TableRow>
            ))}
        </TableBody>
    );
}
