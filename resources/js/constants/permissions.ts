import { UsersIcon, UserCogIcon, BriefcaseIcon } from '@/components/icons';
import type { Permission, PermissionGroupConfig } from '@/types';

export const PERMISSION_GROUPS = {
    users: { title: 'Gestión de usuarios', icon: UsersIcon },
    roles: { title: 'Gestión de roles', icon: UserCogIcon },
    others: { title: 'Otros', icon: BriefcaseIcon },
} satisfies Record<string, PermissionGroupConfig>;

type PermissionDef = Record<string, Permission['name']>;

export const USER_PERMISSIONS = {
    LIST: 'users.list',
    VIEW: 'users.view',
    CREATE: 'users.create',
    UPDATE: 'users.update',
    DELETE: 'users.delete',
} as const satisfies PermissionDef;

export const OTHERS_PERMISSIONS = {
    VIEW_DASHBOARD: 'dashboard.view',
    MANAGE_ROLES: 'roles.manage',
    MANAGE_ERRORS: 'errors.manage',
} as const satisfies PermissionDef;
