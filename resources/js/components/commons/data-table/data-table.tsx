import type { ReactNode } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

export interface ColumnDef<TData> {
    key: keyof TData & string;
    label: string;
    header?: () => ReactNode;
    cell?: ({ row }: { row: TData }) => ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

interface DataTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
}

export default function DataTable<TData extends object>({
    data,
    columns,
}: DataTableProps<TData>) {
    return (
        <Table>
            <TableHeader>
                <TableRow
                    className="border-0! [&>th]:first:rounded-l-xl [&>th]:last:rounded-r-xl"
                    style={{ fontSize: '0.8rem' }}
                >
                    {columns.map((column) => (
                        <TableHead
                            key={column.key}
                            className={cn(
                                'bg-muted px-4 font-bold text-muted-foreground',
                                column.className,
                            )}
                            style={{ textAlign: column.align }}
                        >
                            {column.header ? column.header() : column.label}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((row, index) => (
                    <TableRow key={index}>
                        {columns.map((column) => (
                            <TableCell
                                key={column.key}
                                className={cn('px-4', column.className)}
                                style={{ textAlign: column.align }}
                            >
                                {column.cell?.({ row }) ??
                                    String(row[column.key])}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
