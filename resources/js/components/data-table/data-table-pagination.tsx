import type { Table } from '@tanstack/react-table';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useDataTableStore } from '@/stores/data-table-store';

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
    table,
    pageSizeOptions = [10, 20, 30, 50, 100],
}: DataTablePaginationProps<TData>) {
    const { pageIndex, pageSize } = useDataTableStore(
        (state) => state.pagination,
    );
    const setPageIndex = useDataTableStore((state) => state.setPageIndex);
    const setPageSize = useDataTableStore((state) => state.setPageSize);
    const selectedCount = useDataTableStore((state) =>
        state.getSelectedCount(),
    );

    const pageCount = table.getPageCount();
    const canPreviousPage = pageIndex > 0;
    const canNextPage = pageIndex < pageCount - 1;
    const totalRows = table.getFilteredRowModel().rows.length;

    const handlePageSizeChange = (value: string) => {
        setPageSize(Number(value));
        table.setPageSize(Number(value));
    };

    const handleFirstPage = () => {
        setPageIndex(0);
        table.setPageIndex(0);
    };

    const handlePreviousPage = () => {
        const newIndex = Math.max(0, pageIndex - 1);
        setPageIndex(newIndex);
        table.setPageIndex(newIndex);
    };

    const handleNextPage = () => {
        const newIndex = Math.min(pageCount - 1, pageIndex + 1);
        setPageIndex(newIndex);
        table.setPageIndex(newIndex);
    };

    const handleLastPage = () => {
        const lastIndex = Math.max(0, pageCount - 1);
        setPageIndex(lastIndex);
        table.setPageIndex(lastIndex);
    };

    const paginationInfo = useMemo(() => {
        const start = pageIndex * pageSize + 1;
        const end = Math.min((pageIndex + 1) * pageSize, totalRows);
        return { start, end };
    }, [pageIndex, pageSize, totalRows]);

    return (
        <div className="flex flex-col gap-4 px-2 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
                {selectedCount > 0 ? (
                    <span>
                        {selectedCount} de {totalRows} fila(s) seleccionada(s)
                    </span>
                ) : (
                    <span>
                        Mostrando {paginationInfo.start}-{paginationInfo.end} de{' '}
                        {totalRows} resultado(s)
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm whitespace-nowrap">
                        Filas por página
                    </span>
                    <Select
                        value={String(pageSize)}
                        onValueChange={handlePageSizeChange}
                    >
                        <SelectTrigger className="h-8 w-18">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {pageSizeOptions.map((size) => (
                                <SelectItem key={size} value={String(size)}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-1">
                    <span className="text-sm whitespace-nowrap">
                        Página {pageIndex + 1} de {pageCount || 1}
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={handleFirstPage}
                        disabled={!canPreviousPage}
                        aria-label="Primera página"
                    >
                        <ChevronsLeft className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={handlePreviousPage}
                        disabled={!canPreviousPage}
                        aria-label="Página anterior"
                    >
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={handleNextPage}
                        disabled={!canNextPage}
                        aria-label="Página siguiente"
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={handleLastPage}
                        disabled={!canNextPage}
                        aria-label="Última página"
                    >
                        <ChevronsRight className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
