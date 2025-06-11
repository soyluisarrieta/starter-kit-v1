import { NavFooter } from '@/components/nav-footer'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { type NavItem } from '@/types'
import { Link } from '@inertiajs/react'
import { BookOpen, Folder, LayoutGrid } from 'lucide-react'
import AppLogo from './app-logo'

const mainNavItems: NavItem[] = [
  {
    title: 'Inicio',
    href: '/inicio',
    icon: LayoutGrid
  }
]

const footerNavItems: NavItem[] = [
  {
    title: 'Documentación',
    href: 'https://laravel.com/docs/starter-kits#react',
    icon: BookOpen
  }
]

export function AppSidebar () {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/inicio" prefetch>
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
  )
}
