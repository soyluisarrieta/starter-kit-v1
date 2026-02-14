import type { User } from '@/types/user';
import type { Permission, Role } from './roles-and-permissions';

export type UserAuth = Omit<User, 'roles'>;

export interface Auth {
    user: UserAuth;
    roles: Role[];
    permissions: Permission['name'][];
}
