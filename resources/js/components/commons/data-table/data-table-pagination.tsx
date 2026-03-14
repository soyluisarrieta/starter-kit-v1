import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useDataTableContext } from '@/components/commons/data-table/data-table-context';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface DataTablePaginationProps {
    currentPage: number;
    lastPage: number;
}

export default function DataTablePagination({
    currentPage,
    lastPage,
}: DataTablePaginationProps) {
    const { perPage, setPerPage, refresh } = useDataTableContext((s) => ({
        perPage: s.query.perPage,
        setPerPage: s.setPerPage,
        refresh: s.refresh,
    }));

    const onPerPageChange = (value: string) => {
        setPerPage(value);
        refresh({ perPage: value });
    };

    return (
        <div className="flex items-center justify-center sm:justify-between border-t-2 pt-3 -mt-2">
            <div className="hidden sm:flex items-center gap-2">
                <Label>Por Página</Label>
                <Select value={perPage} onValueChange={onPerPageChange}>
                    <SelectTrigger>
                        <SelectValue placeholder={perPage} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center gap-3 sm:gap-6">
                <span className="text-sm">
                    Página {currentPage} de {lastPage}
                </span>

                <div className="flex items-center gap-1 [&>button]:px-5 [&>button]:sm:px-4">
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage <= 1}
                        onClick={() => refresh({ page: 1 })}
                    >
                        <ChevronsLeft className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage <= 1}
                        onClick={() => refresh({ page: currentPage - 1 })}
                    >
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage >= lastPage}
                        onClick={() => refresh({ page: currentPage + 1 })}
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage >= lastPage}
                        onClick={() => refresh({ page: lastPage })}
                    >
                        <ChevronsRight className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
