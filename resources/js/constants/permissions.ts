import type { PermissionDef } from '@/types';

export const USER_PERMISSIONS = {
    LIST: { key: 'canListUsers', value: 'list:users' },
    VIEW: { key: 'canViewUsers', value: 'view:users' },
    CREATE: { key: 'canCreateUsers', value: 'create:users' },
    UPDATE: { key: 'canUpdateUsers', value: 'update:users' },
    DELETE: { key: 'canDeleteUsers', value: 'delete:users' },
} as const satisfies Record<string, PermissionDef>;

export const ROLE_PERMISSIONS = {
    LIST: { key: 'canReadRoles', value: 'read:roles' },
    CREATE: { key: 'canCreateRoles', value: 'create:roles' },
    UPDATE: { key: 'canUpdateRoles', value: 'update:roles' },
    DELETE: { key: 'canDeleteRoles', value: 'delete:roles' },
} as const satisfies Record<string, PermissionDef>;

export const OTHERS_PERMISSIONS = {
    VIEW_DASHBOARD: { key: 'canViewDashboard', value: 'view:dashboard' },
} as const satisfies Record<string, PermissionDef>;
