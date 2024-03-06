import DashboardPage from '@/components/pages/DashboardPage'
import HomePage from '@/components/pages/HomePage'
import LoginPage from '@/components/pages/LoginPage'
import UsersPage from '@/components/pages/UsersPage'

interface Route {
  path: string
  component: Record<string, React.FC<any>>
  redirectTo?: string
}

export const routes: Route[] = [
  { path: '/', component: { public: HomePage, private: DashboardPage } },
  { path: '/ingresar', component: { guest: LoginPage } },
  { path: '/usuarios', component: { private: UsersPage } }
]
