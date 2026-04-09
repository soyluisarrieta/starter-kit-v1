import type { Role } from '@/types/roles-and-permissions';

export interface User {
    id: string;
    name: string;
    last_name: string;
    avatar: string | null;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface UserWithRoles extends User {
    roleIds: Array<Role['id']>;
}
