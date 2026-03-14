import type { ColumnDef } from '../types/column';

export function getColumnId<T>(column: ColumnDef<T>): string {
    return 'key' in column ? column.key : column.id;
}
