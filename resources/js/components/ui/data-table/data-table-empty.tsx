import { FileX, RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
} from '@/components/ui/empty';
import { useDataTableStore } from '@/stores/data-table-store';

interface DataTableEmptyProps {
    hasData: boolean;
}

export function DataTableEmpty({ hasData }: DataTableEmptyProps) {
    const hasActiveFilters = useDataTableStore((state) =>
        state.hasActiveFilters(),
    );
    const clearAllFilters = useDataTableStore((state) => state.clearAllFilters);

    if (hasActiveFilters) {
        return (
            <Empty className="py-12">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Search />
                    </EmptyMedia>
                    <EmptyTitle>Sin resultados</EmptyTitle>
                    <EmptyDescription>
                        No se encontraron registros que coincidan con los
                        filtros aplicados.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button variant="outline" onClick={clearAllFilters}>
                        <RefreshCw className="mr-2 size-4" />
                        Limpiar filtros
                    </Button>
                </EmptyContent>
            </Empty>
        );
    }

    if (!hasData) {
        return (
            <Empty className="py-12">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <FileX />
                    </EmptyMedia>
                    <EmptyTitle>Sin datos</EmptyTitle>
                    <EmptyDescription>
                        No hay registros disponibles para mostrar.
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        );
    }

    return null;
}
