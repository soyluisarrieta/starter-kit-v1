export type RowId = string | number;
export type BaseRow = { id: RowId };
export type DataRow<TData> = BaseRow & TData;
