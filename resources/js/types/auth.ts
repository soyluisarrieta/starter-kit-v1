import type { User } from '@/types/user';

export type UserAuth = Omit<User, 'roles'>;

export interface Auth {
    user: UserAuth;
    roles: string[];
    permissions: string[];
}

export interface PermissionDef {
    key: string;
    value: string;
}
