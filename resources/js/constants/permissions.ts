import type { PermissionDef } from '@/types';

export const USER_PERMISSIONS = {
    LIST: { key: 'canListUsers', value: 'list:users' },
    VIEW: { key: 'canViewUsers', value: 'view:users' },
    CREATE: { key: 'canCreateUsers', value: 'create:users' },
    EDIT: { key: 'canEditUsers', value: 'edit:users' },
    DELETE: { key: 'canDeleteUsers', value: 'delete:users' },
} as const satisfies Record<string, PermissionDef>;
