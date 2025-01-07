import ForgotPasswordPage from '@/pages/Auth/ForgotPasswordPage'
import LoginPage from '@/pages/Auth/LoginPage'
import RegisterPage from '@/pages/Auth/RegisterPage'
import ResetPasswordPage from '@/pages/Auth/ResetPasswordPage'
import DashboardWidget from '@/components/modules/dashboard/DashboardWidget'
import GeneralSettings from '@/components/modules/settings/GeneralSettings'
import ChangeLogPage from '@/pages/ChangeLogPage'
import DashboardPage from '@/pages/DashboardPage'
import HistoricalPage from '@/pages/HistoricalPage'
import SettingsPage from '@/pages/SettingsPage'
import UsersPage from '@/pages/UsersPage'
import ProfilePage from '@/pages/Auth/ProfilePage'
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
