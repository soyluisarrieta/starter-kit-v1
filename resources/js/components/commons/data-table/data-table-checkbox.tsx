import { useDataTableContext } from '@/components/commons/data-table/data-table-context';
import { Checkbox } from '@/components/ui/checkbox';
import type { BaseRow } from '@/types/data-table';

interface DataTableHeaderCheckboxProps {
    pageRows: BaseRow[];
}

export function DataTableHeaderCheckbox({
    pageRows,
}: DataTableHeaderCheckboxProps) {
    const { selected, toggleAllOnPage } = useDataTableContext((s) => ({
        selected: s.selected,
        toggleAllOnPage: s.toggleAllOnPage,
    }));

    const total = pageRows.length;
    const selectedCount = pageRows.filter((row) => selected.has(row.id)).length;
    const allChecked = total > 0 && selectedCount === total;
    const isMixed = selectedCount > 0 && selectedCount < total;

    return (
        <Checkbox
            className="border-muted-foreground"
            checked={allChecked ? true : isMixed ? 'indeterminate' : false}
            onCheckedChange={(checked) =>
                toggleAllOnPage(pageRows, checked === true)
            }
            aria-label="Seleccionar todos en esta página"
        />
    );
}

interface DataTableRowCheckboxProps {
    row: BaseRow;
}

export function DataTableRowCheckbox({ row }: DataTableRowCheckboxProps) {
    const { isSelected, toggleSelected } = useDataTableContext((s) => ({
        isSelected: s.selected.has(row.id),
        toggleSelected: s.toggleSelected,
    }));

    return (
        <Checkbox
            checked={isSelected}
            onCheckedChange={() => toggleSelected(row)}
            aria-label="Seleccionar fila"
        />
    );
}
