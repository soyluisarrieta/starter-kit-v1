import type { Auth } from './auth';

export type * from './auth';
export type * from './navigation';
export type * from './ui';
export type * from './user';

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    meta: {
        roles: { label: string; value: string }[];
    };
    [key: string]: unknown;
};
