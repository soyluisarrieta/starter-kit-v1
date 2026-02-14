import type { Auth } from '@/types/auth';

export type * from '@/types/auth';
export type * from '@/types/navigation';
export type * from '@/types/ui';
export type * from '@/types/user';
export type * from '@/types/roles-and-permissions';

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
};
