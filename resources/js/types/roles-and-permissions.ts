import type { LucideIcon } from 'lucide-react';
import type { PERMISSION_GROUPS } from '@/constants/permissions';

export interface Role {
    id: number;
    name: string;
    label: string;
    hex_color: string;
    created_at: string;
    updated_at: string;
}

export interface Permission {
    id: number;
    name: string;
    label: string;
}

export interface PermissionGroupConfig {
    title: string;
    icon: LucideIcon;
}

export type PermissionId = number;

export interface Permission {
    id: PermissionId;
    name: string;
    label: string;
}

export type GroupedPermissionId = keyof typeof PERMISSION_GROUPS;

export interface GroupedPermission {
    id: GroupedPermissionId;
    title: string;
    icon: LucideIcon;
    permissions: Permission[];
}

export interface onChangePermissionProps {
    permission: Permission;
    role: Role;
    value: boolean;
}
