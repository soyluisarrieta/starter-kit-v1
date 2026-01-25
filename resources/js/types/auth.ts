export interface UserAuth {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    created_at: string;
    updated_at: string;
}

export interface Auth {
    user: UserAuth;
    roles: string[];
    permissions: string[];
}

export interface PermissionDef {
    key: string;
    value: string;
}
