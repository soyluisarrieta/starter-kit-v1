import type { PermissionDef } from '@/types';

export const USER_PERMISSIONS = {
    LIST: { key: 'canListUsers', value: 'users.list' },
    VIEW: { key: 'canViewUsers', value: 'users.view' },
    CREATE: { key: 'canCreateUsers', value: 'users.create' },
    UPDATE: { key: 'canUpdateUsers', value: 'users.update' },
    DELETE: { key: 'canDeleteUsers', value: 'users.delete' },
} as const satisfies Record<string, PermissionDef>;

export const ROLE_PERMISSIONS = {
    LIST: { key: 'canReadRoles', value: 'roles.read' },
    CREATE: { key: 'canCreateRoles', value: 'roles.create' },
    UPDATE: { key: 'canUpdateRoles', value: 'roles.update' },
    DELETE: { key: 'canDeleteRoles', value: 'roles.delete' },
} as const satisfies Record<string, PermissionDef>;

export const OTHERS_PERMISSIONS = {
    VIEW_DASHBOARD: { key: 'canViewDashboard', value: 'dashboard.view' },
} as const satisfies Record<string, PermissionDef>;
