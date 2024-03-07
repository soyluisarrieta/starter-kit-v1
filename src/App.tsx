import { Route, Switch } from 'wouter'
import MasterLayout from '@/components/layouts/MasterLayout'
import NotFoundPage from '@/components/pages/Errors/NotFoundPage'
import DashboardPage from '@/components/pages/DashboardPage'
import UsersPage from '@/components/pages/UsersPage'
import AdminLayout from '@/components/layouts/AdminLayout'
import LoginPage from '@/components/pages/LoginPage'
import RegisterPage from '@/components/pages/RegisterPage'
import GuestLayout from '@/components/layouts/GuestLayout'

export default function App (): JSX.Element {
  const guestRoutes = [
    { path: '/ingresar', component: LoginPage },
    { path: '/registrarse', component: RegisterPage }
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
