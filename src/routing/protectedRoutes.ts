import DashboardWidget from '@/components/modules/dashboard/DashboardWidget'
import DashboardPage from '@/components/pages/DashboardPage'
import SettingsPage from '@/components/pages/SettingsPage'
import UsersPage from '@/components/pages/UsersPage'
import ProfilePage from '@/components/pages/auth/ProfilePage'

export const protectedRoutes: ProtectedRouteConfig[] = [
  {
    path: '/',
    component: DashboardPage,
    widgets: DashboardWidget
  },
  {
    path: '/usuarios',
    component: UsersPage
  },
  {
    path: '/ajustes',
    component: SettingsPage,
    children: [
      {
        path: '/perfil',
        component: ProfilePage
      }
    ]
  }
]
