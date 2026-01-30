import type { PermissionDef } from '@/types';

export const USER_PERMISSIONS = {
    LIST: { key: 'canListUser', value: 'list:user' },
    VIEW: { key: 'canViewUser', value: 'view:user' },
    CREATE: { key: 'canCreateUser', value: 'create:user' },
    EDIT: { key: 'canEditUser', value: 'edit:user' },
    DELETE: { key: 'canDeleteUser', value: 'delete:user' },
} as const satisfies Record<string, PermissionDef>;
