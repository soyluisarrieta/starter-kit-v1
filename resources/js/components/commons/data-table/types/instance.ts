import type { StoreApi } from 'zustand';
import type { DataTableStore } from '../store/create-store';
import type { Paginated } from './pagination';
import type { DataRow } from './row';

export type DataTableStoreApi<TData> = StoreApi<DataTableStore<DataRow<TData>>>;

export interface DataTableInstance<TData>
    extends DataTableStoreApi<TData>, DataTableStore<DataRow<TData>> {
    data: Paginated<TData>;
    isFetching: boolean;
}
