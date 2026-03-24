import { cleanQueryParams } from '@/components/commons/data-table/lib/clean-query-params';

describe('cleanQueryParams', () => {
    it('removes empty string values', () => {
        expect(cleanQueryParams({ search: '' })).toEqual({});
    });

    it('removes null values', () => {
        expect(cleanQueryParams({ sortBy: null as unknown as string })).toEqual({});
    });

    it('removes undefined values', () => {
        expect(cleanQueryParams({ sortOrder: undefined })).toEqual({});
    });

    it('keeps non-empty string values', () => {
        expect(cleanQueryParams({ search: 'alice' })).toEqual({ search: 'alice' });
    });

    it('keeps numeric values', () => {
        expect(cleanQueryParams({ perPage: '25' })).toEqual({ perPage: '25' });
    });

    it('removes page when value is 1', () => {
        expect(cleanQueryParams({ page: 1, search: 'test' })).toEqual({ search: 'test' });
    });

    it('keeps page when value is greater than 1', () => {
        expect(cleanQueryParams({ page: 2 })).toEqual({ page: 2 });
    });

    it('keeps page when value is 0', () => {
        expect(cleanQueryParams({ page: 0 })).toEqual({ page: 0 });
    });

    it('returns empty object for all-empty params', () => {
        expect(cleanQueryParams({ search: '', perPage: undefined, sortBy: null as unknown as string, page: 1 })).toEqual({});
    });

    it('keeps all valid fields in a fully populated params object', () => {
        const result = cleanQueryParams({
            search: 'foo',
            perPage: '25',
            sortBy: 'name',
            sortOrder: 'asc',
            page: 3,
        });

        expect(result).toEqual({
            search: 'foo',
            perPage: '25',
            sortBy: 'name',
            sortOrder: 'asc',
            page: 3,
        });
    });
});
