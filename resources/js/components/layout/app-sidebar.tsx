import { Link } from '@inertiajs/react';
import {
    BookOpenIcon,
    FolderIcon,
    HomeIcon,
    UserIcon,
} from '@/components/icons';
import AppLogo from '@/components/layout/app-logo';
import { NavFooter } from '@/components/layout/nav-footer';
import { NavMain } from '@/components/layout/nav-main';
import { NavUser } from '@/components/layout/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { USER_PERMISSIONS } from '@/constants/permissions';
import { useCan } from '@/hooks/use-can';
import { dashboard, users } from '@/routes';
import type { NavItem } from '@/types';

const footerNavItems: NavItem[] = [
    {
        title: 'Repositorio',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderIcon,
    },
    {
        title: 'Documentación',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpenIcon,
    },
];

export function AppSidebar() {
    const { canList: canListUsers } = useCan([USER_PERMISSIONS.LIST]);

    const mainNavItems: NavItem[] = [
        {
            title: 'Inicio',
            href: dashboard(),
            icon: HomeIcon,
        },
        {
            title: 'Usuarios',
            href: users(),
            icon: UserIcon,
            hasPermission: canListUsers,
        },
    ];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch cacheFor="1m">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
