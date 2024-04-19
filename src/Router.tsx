import { Route, Switch } from 'wouter'
import MasterLayout from '@/components/layouts/MasterLayout'
import NotFoundPage from '@/components/pages/errors/NotFoundPage'
import DashboardPage from '@/components/pages/DashboardPage'
import DashboardWidget from '@/components/modules/dashboard/DashboardWidget'
import UsersPage from '@/components/pages/UsersPage'
import AdminLayout from '@/components/layouts/AdminLayout'
import LoginPage from '@/components/pages/auth/LoginPage'
import RegisterPage from '@/components/pages/auth/RegisterPage'
import GuestLayout from '@/components/layouts/GuestLayout'
import ForgotPasswordPage from '@/components/pages/auth/ForgotPasswordPage'
import ResetPasswordPage from '@/components/pages/auth/ResetPasswordPage'
import SettingsPage from '@/components/pages/SettingsPage'
import ProfilePage from '@/components/pages/auth/ProfilePage'

export default function Router (): JSX.Element {
  const guestRoutes = [
    { path: '/ingresar', component: LoginPage },
    { path: '/registrarse', component: RegisterPage },
    { path: '/recuperar-contrasena', component: ForgotPasswordPage },
    { path: '/restablecer-contrasena/:token', component: ResetPasswordPage }
  ]

  const protectedRoutes = [
    { path: '/', component: DashboardPage, widgets: DashboardWidget },
    { path: '/usuarios', component: UsersPage },
    { path: '/ajustes', component: SettingsPage },
    { path: '/ajustes/perfil', component: ProfilePage }
  ]

  return (
    <MasterLayout>
      <Switch>
        {guestRoutes.map(({ path, component: Component }) => (
          <Route key={path} path={path}>
            <GuestLayout>
              <Component />
            </GuestLayout>
          </Route>
        ))}

        {protectedRoutes.map(({ path, component: Component, widgets }) => (
          <Route key={path} path={path}>
            <AdminLayout widgets={widgets}>
              <Component />
            </AdminLayout>
          </Route>
        ))}

        <Route component={NotFoundPage} />
      </Switch>
    </MasterLayout>
  )
}
