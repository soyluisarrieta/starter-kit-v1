import ForgotPasswordPage from '@/components/pages/auth/ForgotPasswordPage'
import LoginPage from '@/components/pages/auth/LoginPage'
import RegisterPage from '@/components/pages/auth/RegisterPage'
import ResetPasswordPage from '@/components/pages/auth/ResetPasswordPage'
import DashboardWidget from '@/components/modules/dashboard/DashboardWidget'
import GeneralSettings from '@/components/modules/settings/GeneralSettings'
import ChangeLogPage from '@/components/pages/ChangeLogPage'
import DashboardPage from '@/components/pages/DashboardPage'
import HistoricalPage from '@/components/pages/HistoricalPage'
import SettingsPage from '@/components/pages/SettingsPage'
import UsersPage from '@/components/pages/UsersPage'
import ProfilePage from '@/components/pages/auth/ProfilePage'
import ProfileSettings from '@/components/modules/settings/ProfileSettings'
import AuthSettings from '@/components/modules/settings/AuthSettings'

export interface RouteConfig {
  path: string
  component: React.ComponentType<any>
  widgets?: React.ComponentType<any>
  nest?: RouteConfig[]
}

// PUBLIC ROUTES
export const guestRoutes: RouteConfig[] = [
  { path: '/ingresar', component: LoginPage },
  { path: '/registrarse', component: RegisterPage },
  { path: '/recuperar-contrasena', component: ForgotPasswordPage },
  { path: '/restablecer-contrasena/:token', component: ResetPasswordPage }
]

// PROTECTED ROUTES
export const protectedRoutes: RouteConfig[] = [
  { path: '/', component: DashboardPage, widgets: DashboardWidget },
  { path: '/perfil', component: ProfilePage },
  { path: '/usuarios', component: UsersPage },

  // Settings
  {
    path: '/ajustes',
    component: SettingsPage,
    nest: [
      { path: '/generales', component: GeneralSettings },
      { path: '/perfil', component: ProfileSettings },
      { path: '/autenticacion', component: AuthSettings }
    ]
  },

  // Others
  { path: '/actualizaciones', component: ChangeLogPage },
  { path: '/historial', component: HistoricalPage }
]
