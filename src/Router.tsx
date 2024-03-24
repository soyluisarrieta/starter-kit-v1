import { Route, Switch } from 'wouter'
import MasterLayout from '@/components/layouts/MasterLayout'
import NotFoundPage from '@/components/pages/Errors/NotFoundPage'
import DashboardPage from '@/components/pages/DashboardPage'
import UsersPage from '@/components/pages/UsersPage'
import AdminLayout from '@/components/layouts/AdminLayout'
import LoginPage from '@/components/pages/Auth/LoginPage'
import RegisterPage from '@/components/pages/Auth/RegisterPage'
import GuestLayout from '@/components/layouts/GuestLayout'
import ForgotPasswordPage from '@/components/pages/Auth/ForgotPasswordPage'
import ResetPasswordPage from '@/components/pages/Auth/ResetPasswordPage'

export default function Router (): JSX.Element {
  const guestRoutes = [
    { path: '/ingresar', component: LoginPage },
    { path: '/registrarse', component: RegisterPage },
    { path: '/recuperar-contrasena', component: ForgotPasswordPage },
    { path: '/restablecer-contrasena/:token', component: ResetPasswordPage }
  ]

  const protectedRoutes = [
    { path: '/', component: DashboardPage },
    { path: '/usuarios', component: UsersPage }
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

        {protectedRoutes.map(({ path, component: Component }) => (
          <Route key={path} path={path}>
            <AdminLayout>
              <Component />
            </AdminLayout>
          </Route>
        ))}

        <Route component={NotFoundPage} />
      </Switch>
    </MasterLayout>
  )
}
