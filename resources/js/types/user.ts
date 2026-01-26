export interface User {
    id: number;
    name: string;
    avatar: string | null;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: string[];
}
