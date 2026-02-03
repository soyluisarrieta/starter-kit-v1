import type { User } from '@/types/user';

export interface Role {
    id: number;
    name: string;
    label: string;
    hex_color: string;
    created_at: string;
    updated_at: string;
}

export type UserAuth = Omit<User, 'roles'>;

export interface Auth {
    user: UserAuth;
    roles: Role[];
    permissions: string[];
}

export interface PermissionDef {
    key: string;
    value: string;
}
