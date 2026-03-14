import DataTableColumnVisibility from './data-table-column-visibility';
import DataTableInputSearch from './data-table-input-search';
import type { ColumnDef, DataTableSearchOptions } from './types';

interface DataTableToolbarProps<TData> {
    columns: ColumnDef<TData>[];
    search?: DataTableSearchOptions;
}

export default function DataTableToolbar<TData>({
    columns,
    search,
}: DataTableToolbarProps<TData>) {
    return (
        <div className="flex items-center justify-between">
            <DataTableInputSearch {...search} />
            <DataTableColumnVisibility columns={columns} />
        </div>
    );
}
