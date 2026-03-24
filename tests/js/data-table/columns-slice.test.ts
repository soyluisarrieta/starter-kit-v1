import { create } from 'zustand';
import { createColumnsSlice } from '@/components/commons/data-table/store/slices/columns-slice';
import type { ColumnsSlice } from '@/components/commons/data-table/store/slices/columns-slice';

const useStore = create<ColumnsSlice>(createColumnsSlice);

beforeEach(() => {
    useStore.setState({ hiddenColumns: new Set() });
});

describe('hideColumn', () => {
    it('adds a column ID to hiddenColumns', () => {
        useStore.getState().hideColumn('name');
        expect(useStore.getState().hiddenColumns.has('name')).toBe(true);
    });

    it('is idempotent — adding the same column twice keeps it once', () => {
        useStore.getState().hideColumn('name');
        useStore.getState().hideColumn('name');
        expect(useStore.getState().hiddenColumns.size).toBe(1);
    });

    it('does not affect other hidden columns', () => {
        useStore.getState().hideColumn('name');
        useStore.getState().hideColumn('email');
        expect(useStore.getState().hiddenColumns.has('name')).toBe(true);
        expect(useStore.getState().hiddenColumns.has('email')).toBe(true);
    });
});

describe('toggleColumn', () => {
    it('hides a column that is currently visible', () => {
        useStore.getState().toggleColumn('name');
        expect(useStore.getState().hiddenColumns.has('name')).toBe(true);
    });

    it('reveals a column that is currently hidden', () => {
        useStore.getState().hideColumn('name');
        useStore.getState().toggleColumn('name');
        expect(useStore.getState().hiddenColumns.has('name')).toBe(false);
    });

    it('toggling twice returns column to visible state', () => {
        useStore.getState().toggleColumn('name');
        useStore.getState().toggleColumn('name');
        expect(useStore.getState().hiddenColumns.has('name')).toBe(false);
    });

    it('does not affect other columns when toggling one', () => {
        useStore.getState().hideColumn('email');
        useStore.getState().toggleColumn('name');
        expect(useStore.getState().hiddenColumns.has('email')).toBe(true);
    });
});
