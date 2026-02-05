import type { Permission } from '@/types';

type PermissionDef = Record<string, Permission['name']>;

export const USER_PERMISSIONS = {
    LIST: 'users.list',
    VIEW: 'users.view',
    CREATE: 'users.create',
    UPDATE: 'users.update',
    DELETE: 'users.delete',
} as const satisfies PermissionDef;

export const ROLE_PERMISSIONS = {
    LIST: 'roles.read',
    CREATE: 'roles.create',
    UPDATE: 'roles.update',
    DELETE: 'roles.delete',
} as const satisfies PermissionDef;

export const OTHERS_PERMISSIONS = {
    VIEW_DASHBOARD: 'dashboard.view',
} as const satisfies PermissionDef;
