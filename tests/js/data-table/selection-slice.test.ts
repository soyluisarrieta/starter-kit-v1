import { create } from 'zustand';
import { createSelectionSlice } from '@/components/commons/data-table/store/slices/selection-slice';
import type { SelectionSlice } from '@/components/commons/data-table/store/slices/selection-slice';

type TestRow = { id: number; name: string };

const useStore = create<SelectionSlice<TestRow>>(createSelectionSlice<TestRow>());

beforeEach(() => {
    useStore.setState({ target: null, selected: new Map() });
});

describe('setTarget', () => {
    it('sets target to a given row', () => {
        useStore.getState().setTarget({ id: 1, name: 'Alice' });
        expect(useStore.getState().target).toEqual({ id: 1, name: 'Alice' });
    });

    it('sets target to null', () => {
        useStore.getState().setTarget({ id: 1, name: 'Alice' });
        useStore.getState().setTarget(null);
        expect(useStore.getState().target).toBeNull();
    });

    it('overrides a previously set target', () => {
        useStore.getState().setTarget({ id: 1, name: 'Alice' });
        useStore.getState().setTarget({ id: 2, name: 'Bob' });
        expect(useStore.getState().target).toEqual({ id: 2, name: 'Bob' });
    });
});

describe('toggleSelected', () => {
    it('adds a row when not already selected', () => {
        useStore.getState().toggleSelected({ id: 1, name: 'Alice' });
        expect(useStore.getState().selected.has(1)).toBe(true);
    });

    it('removes a row when already selected', () => {
        useStore.getState().toggleSelected({ id: 1, name: 'Alice' });
        useStore.getState().toggleSelected({ id: 1, name: 'Alice' });
        expect(useStore.getState().selected.has(1)).toBe(false);
    });

    it('preserves other selected rows when toggling one', () => {
        useStore.getState().toggleSelected({ id: 1, name: 'Alice' });
        useStore.getState().toggleSelected({ id: 2, name: 'Bob' });
        useStore.getState().toggleSelected({ id: 1, name: 'Alice' });
        expect(useStore.getState().selected.has(1)).toBe(false);
        expect(useStore.getState().selected.has(2)).toBe(true);
    });

    it('uses row.id as the map key', () => {
        useStore.getState().toggleSelected({ id: 42, name: 'Test' });
        expect(useStore.getState().selected.get(42)).toEqual({ id: 42, name: 'Test' });
    });
});

describe('toggleAllOnPage', () => {
    const rows: TestRow[] = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Carol' },
    ];

    it('adds all rows when checked=true', () => {
        useStore.getState().toggleAllOnPage(rows, true);
        const { selected } = useStore.getState();
        expect(selected.size).toBe(3);
        expect(selected.has(1)).toBe(true);
        expect(selected.has(2)).toBe(true);
        expect(selected.has(3)).toBe(true);
    });

    it('removes specified rows when checked=false', () => {
        useStore.getState().toggleAllOnPage(rows, true);
        useStore.getState().toggleAllOnPage(rows, false);
        expect(useStore.getState().selected.size).toBe(0);
    });

    it('does not remove rows outside the provided list when unchecking', () => {
        useStore.getState().toggleAllOnPage(rows, true);
        useStore.getState().toggleAllOnPage([rows[0], rows[1]], false);
        expect(useStore.getState().selected.has(1)).toBe(false);
        expect(useStore.getState().selected.has(2)).toBe(false);
        expect(useStore.getState().selected.has(3)).toBe(true);
    });

    it('handles an empty rows array gracefully', () => {
        useStore.getState().toggleAllOnPage([], true);
        expect(useStore.getState().selected.size).toBe(0);
    });
});

describe('clearSelected', () => {
    it('empties the selected map', () => {
        useStore.getState().toggleSelected({ id: 1, name: 'Alice' });
        useStore.getState().toggleSelected({ id: 2, name: 'Bob' });
        useStore.getState().clearSelected();
        expect(useStore.getState().selected.size).toBe(0);
    });

    it('does not affect target', () => {
        useStore.getState().setTarget({ id: 1, name: 'Alice' });
        useStore.getState().clearSelected();
        expect(useStore.getState().target).toEqual({ id: 1, name: 'Alice' });
    });
});
