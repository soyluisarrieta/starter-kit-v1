export interface User {
    id: number;
    name: string;
    avatar: string | null;
    email: string;
    created_at: string;
    updated_at: string;
    roles: string[];
}
