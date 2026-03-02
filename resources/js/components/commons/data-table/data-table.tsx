import type { ReactNode } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export interface ColumnDef<TData> {
    key: keyof TData & string;
    label: string;
    header?: () => ReactNode;
    cell?: ({ row }: { row: TData }) => ReactNode;
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
                            className="bg-muted font-bold text-muted-foreground"
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
                            <TableCell key={column.key}>
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
