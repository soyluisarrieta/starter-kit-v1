import { router } from '@inertiajs/react';
import { create } from 'zustand';
import { createQuerySlice } from '@/components/commons/data-table/store/slices/query-slice';
import type { QuerySlice } from '@/components/commons/data-table/store/slices/query-slice';

vi.mock('@inertiajs/react', () => ({
    router: { get: vi.fn() },
}));

const mockRoute = { url: '/users', method: 'get' as const };
const defaultParams = { search: '', perPage: '10', sortBy: '', sortOrder: '' };

function makeStore(queryParams = {}) {
    return create<QuerySlice>(createQuerySlice(mockRoute, queryParams, defaultParams));
}

let useStore: ReturnType<typeof makeStore>;

beforeEach(() => {
    useStore = makeStore();
    vi.mocked(router.get).mockClear();
});

describe('setSearch', () => {
    it('updates query.search', () => {
        useStore.getState().setSearch('alice');
        expect(useStore.getState().query.search).toBe('alice');
    });

    it('preserves other query fields', () => {
        useStore.getState().setPerPage('25');
        useStore.getState().setSearch('alice');
        expect(useStore.getState().query.perPage).toBe('25');
    });
});

describe('setPerPage', () => {
    it('updates query.perPage', () => {
        useStore.getState().setPerPage('50');
        expect(useStore.getState().query.perPage).toBe('50');
    });

    it('preserves other query fields', () => {
        useStore.getState().setSearch('bob');
        useStore.getState().setPerPage('50');
        expect(useStore.getState().query.search).toBe('bob');
    });
});

describe('setSort', () => {
    it('updates sortBy and sortOrder together', () => {
        useStore.getState().setSort('name', 'asc');
        expect(useStore.getState().query.sortBy).toBe('name');
        expect(useStore.getState().query.sortOrder).toBe('asc');
    });

    it('preserves other query fields', () => {
        useStore.getState().setSearch('carol');
        useStore.getState().setSort('name', 'desc');
        expect(useStore.getState().query.search).toBe('carol');
    });
});

describe('refresh', () => {
    it('calls router.get with route.url', () => {
        useStore.getState().refresh();
        expect(vi.mocked(router.get)).toHaveBeenCalledWith(
            '/users',
            expect.any(Object),
            expect.any(Object),
        );
    });

    it('calls router.get with preserveState and preserveScroll', () => {
        useStore.getState().refresh();
        expect(vi.mocked(router.get)).toHaveBeenCalledWith(
            expect.any(String),
            expect.any(Object),
            { preserveState: true, preserveScroll: true },
        );
    });

    describe('isPageOnly = true (only page param passed)', () => {
        it('keeps the page value in params', () => {
            useStore.getState().refresh({ page: 3 });
            const params = vi.mocked(router.get).mock.calls[0][1] as Record<string, unknown>;
            expect(params.page).toBe(3);
        });

        it('does not strip the page key', () => {
            useStore.getState().refresh({ page: 5 });
            const params = vi.mocked(router.get).mock.calls[0][1] as Record<string, unknown>;
            expect('page' in params).toBe(true);
        });
    });

    describe('isPageOnly = false (non-page params passed)', () => {
        it('strips page from params when other params are present', () => {
            useStore = makeStore({ page: 4 });
            useStore.getState().refresh({ search: 'alice' });
            const params = vi.mocked(router.get).mock.calls[0][1] as Record<string, unknown>;
            expect('page' in params).toBe(false);
        });

        it('merges provided params into query before stripping page', () => {
            useStore.getState().refresh({ search: 'alice' });
            const params = vi.mocked(router.get).mock.calls[0][1] as Record<string, unknown>;
            expect(params.search).toBe('alice');
        });
    });

    describe('when params is undefined', () => {
        it('strips page from params', () => {
            useStore = makeStore({ page: 2 });
            useStore.getState().refresh();
            const params = vi.mocked(router.get).mock.calls[0][1] as Record<string, unknown>;
            expect('page' in params).toBe(false);
        });
    });

    describe('integration with cleanQueryParams', () => {
        it('strips empty string values before passing to router.get', () => {
            useStore.getState().refresh();
            const params = vi.mocked(router.get).mock.calls[0][1] as Record<string, unknown>;
            expect('search' in params).toBe(false);
            expect('sortBy' in params).toBe(false);
            expect('sortOrder' in params).toBe(false);
        });

        it('strips page=1 before passing to router.get', () => {
            useStore.getState().refresh({ page: 1 });
            const params = vi.mocked(router.get).mock.calls[0][1] as Record<string, unknown>;
            expect('page' in params).toBe(false);
        });
    });
});
