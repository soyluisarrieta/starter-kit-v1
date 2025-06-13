import { LucideIcon } from 'lucide-react'
import type { Config } from 'ziggy-js'

export interface Auth {
    user: User;
    roles: string[];
    permissions: string[];
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
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: string;
    name: string;
    lastname: string;
    gender: 'male' | 'female' | 'other';
    birthdate: string;
    address: string;
    phone: string;
    email: string;
    avatar?: string;
    roles: string[];
    permissions: string[];
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}
