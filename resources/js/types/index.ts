import { LucideIcon } from 'lucide-react'

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    lastname: string;
    gender: 'male' | 'female' | 'other';
    gender_letter: 'o' | 'a' | '@';
    birthdate: Date | null;
    address: string | null;
    phone: string | null;
    has_whatsapp: boolean;
    email: string;
    avatar?: string | null;
    email_verified_at: string | null;
    updated_at: string;
}
