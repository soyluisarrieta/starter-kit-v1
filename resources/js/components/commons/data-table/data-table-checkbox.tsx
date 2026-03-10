import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { Checkbox } from '@/components/ui/checkbox';
import type { DTable, RowId } from '@/types/data-table';

interface DataTableHeaderCheckboxProps<TData> extends DTable<TData> {
    pageIds: RowId[];
}

export function DataTableHeaderCheckbox<TData>({
    table,
    pageIds,
}: DataTableHeaderCheckboxProps<TData>) {
    const { allChecked, isMixed, toggleAllOnPage } = useStore(
        table,
        useShallow((s) => {
            const total = pageIds.length;
            const selectedCount = pageIds.filter((id) =>
                s.selected.has(id),
            ).length;
            return {
                allChecked: total > 0 && selectedCount === total,
                isMixed: selectedCount > 0 && selectedCount < total,
                toggleAllOnPage: s.toggleAllOnPage,
            };
        }),
    );

    return (
        <Checkbox
            className="border-muted-foreground"
            checked={allChecked ? true : isMixed ? 'indeterminate' : false}
            onCheckedChange={(checked) =>
                toggleAllOnPage(pageIds, checked === true)
            }
            aria-label="Seleccionar todos en esta página"
        />
    );
}

interface DataTableRowCheckboxProps<TData> extends DTable<TData> {
    rowId: RowId;
}

export function DataTableRowCheckbox<TData>({
    table,
    rowId,
}: DataTableRowCheckboxProps<TData>) {
    const { isSelected, toggleSelected } = useStore(
        table,
        useShallow((s) => ({
            isSelected: s.selected.has(rowId),
            toggleSelected: s.toggleSelected,
        })),
    );

    return (
        <Checkbox
            checked={isSelected}
            onCheckedChange={() => toggleSelected(rowId)}
            aria-label="Seleccionar fila"
        />
    );
}
