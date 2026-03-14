import type { StateCreator } from 'zustand';

export interface ColumnsSlice {
    hiddenColumns: Set<string>;

    hideColumn: (columnId: string) => void;
    toggleColumn: (columnId: string) => void;
}

export const createColumnsSlice: StateCreator<ColumnsSlice> = (set) => ({
    hiddenColumns: new Set(),

    hideColumn: (columnId) =>
        set((state) => {
            const next = new Set(state.hiddenColumns);
            next.add(columnId);
            return { hiddenColumns: next };
        }),

    toggleColumn: (columnId) =>
        set((state) => {
            const next = new Set(state.hiddenColumns);
            if (next.has(columnId)) {
                next.delete(columnId);
            } else {
                next.add(columnId);
            }
            return { hiddenColumns: next };
        }),
});
