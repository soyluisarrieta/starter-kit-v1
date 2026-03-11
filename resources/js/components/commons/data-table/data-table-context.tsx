import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { DataTableStore } from '@/stores/data-table-store';
import type {
    BaseRow,
    DataTableInstance,
    DataTableStoreApi,
} from '@/types/data-table';

type ContextStore = DataTableStore<BaseRow>;

const DataTableContext = createContext<DataTableStoreApi<BaseRow> | null>(null);

interface DataTableProviderProps<TData> {
    table: DataTableInstance<TData>;
    children: ReactNode;
}

export function DataTableProvider<TData>({
    table,
    children,
}: DataTableProviderProps<TData>) {
    return (
        <DataTableContext.Provider
            value={table as unknown as DataTableStoreApi<BaseRow>}
        >
            {children}
        </DataTableContext.Provider>
    );
}

export function useDataTableContext<TStore>(
    selector: (state: ContextStore) => TStore,
) {
    const store = useContext(DataTableContext);

    if (!store) {
        throw new Error(
            'useDataTableContext must be used within a DataTableProvider',
        );
    }

    return useStore(store, useShallow(selector));
}
