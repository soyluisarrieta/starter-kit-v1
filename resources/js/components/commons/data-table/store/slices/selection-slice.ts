import type { StateCreator } from 'zustand';
import type { RowId } from '../../types/row';

export interface SelectionSlice<TData> {
    target: TData | null;
    selected: Map<RowId, TData>;

    setTarget: (row: TData | null) => void;
    toggleSelected: (row: TData & { id: RowId }) => void;
    toggleAllOnPage: (rows: (TData & { id: RowId })[], checked: boolean) => void;
    clearSelected: () => void;
}

export const createSelectionSlice =
    <TData>(): StateCreator<SelectionSlice<TData>> =>
        (set) => ({
            target: null,
            selected: new Map(),

            setTarget: (target) => set({ target }),

            toggleSelected: (row) =>
                set((state) => {
                    const next = new Map(state.selected);
                    if (next.has(row.id)) {
                        next.delete(row.id);
                    } else {
                        next.set(row.id, row);
                    }
                    return { selected: next };
                }),

            toggleAllOnPage: (rows, checked) =>
                set((state) => {
                    const next = new Map(state.selected);
                    if (checked) {
                        rows.forEach((row) => next.set(row.id, row));
                    } else {
                        rows.forEach((row) => next.delete(row.id));
                    }
                    return { selected: next };
                }),

            clearSelected: () => set({ selected: new Map() }),
        });
