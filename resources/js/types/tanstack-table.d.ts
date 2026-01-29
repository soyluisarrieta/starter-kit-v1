import type { RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnDefBase<TData extends RowData = RowData, TValue = unknown> {
        label?: string;
    }
}
