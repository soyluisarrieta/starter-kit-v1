import type {
    SortingState,
    VisibilityState,
    RowSelectionState,
} from '@tanstack/react-table';
import { create } from 'zustand';
import type {
    FilterValue,
    DateRange,
    DataTableFiltersState,
} from '@/types/data-table';

interface DataTableStoreState {
    sorting: SortingState;
    columnVisibility: VisibilityState;
    rowSelection: RowSelectionState;
    filters: DataTableFiltersState;
    pagination: {
        pageIndex: number;
        pageSize: number;
    };
}

interface DataTableStoreActions {
    setSorting: (
        sorting: SortingState | ((prev: SortingState) => SortingState),
    ) => void;
    setColumnVisibility: (
        visibility:
            | VisibilityState
            | ((prev: VisibilityState) => VisibilityState),
    ) => void;
    setRowSelection: (
        selection:
            | RowSelectionState
            | ((prev: RowSelectionState) => RowSelectionState),
    ) => void;
    setGlobalSearch: (search: string) => void;
    setColumnFilter: (columnId: string, filter: FilterValue) => void;
    removeColumnFilter: (columnId: string) => void;
    clearAllFilters: () => void;
    setPageIndex: (index: number) => void;
    setPageSize: (size: number) => void;
    resetPagination: () => void;
    hasActiveFilters: () => boolean;
    getSelectedCount: () => number;
}

type DataTableStore = DataTableStoreState & DataTableStoreActions;

const initialFilters: DataTableFiltersState = {
    globalSearch: '',
    columnFilters: {},
};

const initialState: DataTableStoreState = {
    sorting: [],
    columnVisibility: {},
    rowSelection: {},
    filters: initialFilters,
    pagination: {
        pageIndex: 0,
        pageSize: 10,
    },
};

export const useDataTableStore = create<DataTableStore>((set, get) => ({
    ...initialState,

    setSorting: (sorting) =>
        set((state) => ({
            sorting:
                typeof sorting === 'function'
                    ? sorting(state.sorting)
                    : sorting,
        })),

    setColumnVisibility: (visibility) =>
        set((state) => ({
            columnVisibility:
                typeof visibility === 'function'
                    ? visibility(state.columnVisibility)
                    : visibility,
        })),

    setRowSelection: (selection) =>
        set((state) => ({
            rowSelection:
                typeof selection === 'function'
                    ? selection(state.rowSelection)
                    : selection,
        })),

    setGlobalSearch: (search) =>
        set((state) => ({
            filters: { ...state.filters, globalSearch: search },
            pagination: { ...state.pagination, pageIndex: 0 },
        })),

    setColumnFilter: (columnId, filter) =>
        set((state) => ({
            filters: {
                ...state.filters,
                columnFilters: {
                    ...state.filters.columnFilters,
                    [columnId]: filter,
                },
            },
            pagination: { ...state.pagination, pageIndex: 0 },
        })),

    removeColumnFilter: (columnId) =>
        set((state) => {
            const newColumnFilters = { ...state.filters.columnFilters };
            delete newColumnFilters[columnId];
            return {
                filters: { ...state.filters, columnFilters: newColumnFilters },
                pagination: { ...state.pagination, pageIndex: 0 },
            };
        }),

    clearAllFilters: () =>
        set((state) => ({
            filters: initialFilters,
            pagination: { ...state.pagination, pageIndex: 0 },
        })),

    setPageIndex: (index) =>
        set((state) => ({
            pagination: { ...state.pagination, pageIndex: index },
        })),

    setPageSize: (size) =>
        set(() => ({
            pagination: { pageIndex: 0, pageSize: size },
        })),

    resetPagination: () =>
        set((state) => ({
            pagination: { ...state.pagination, pageIndex: 0 },
        })),

    hasActiveFilters: () => {
        const { filters } = get();
        return (
            filters.globalSearch.length > 0 ||
            Object.keys(filters.columnFilters).length > 0
        );
    },

    getSelectedCount: () => Object.keys(get().rowSelection).length,
}));

export function createMultiValueFilter(
    columnId: string,
    values: string[],
): FilterValue {
    return { type: 'multiValue', columnId, values };
}

export function createDateRangeFilter(
    columnId: string,
    range: DateRange,
): FilterValue {
    return { type: 'dateRange', columnId, range };
}
