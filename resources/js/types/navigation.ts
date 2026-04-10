import type { InertiaLinkProps } from '@inertiajs/react';
import type { IconType } from '@/components/icons';

export type BreadcrumbItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
};

export type NavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: IconType | null;
    isActive?: boolean;
    hasPermission?: boolean;
};
