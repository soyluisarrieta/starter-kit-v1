import AdminLayout from '@/components/layouts/AdminLayout'
import GuestLayout from '@/components/layouts/GuestLayout'
import PublicLayout from '@/components/layouts/PublicLayout'
import DashboardPage from '@/components/pages/DashboardPage'
import HomePage from '@/components/pages/HomePage'
import LoginPage from '@/components/pages/LoginPage'
import UsersPage from '@/components/pages/UsersPage'

interface ILayout {
  children: React.ReactNode
}

type LayoutComponent = React.FC<ILayout> | null
export type LayoutMap = Record<string, (isAuth?: boolean) => LayoutComponent | false>

// Mapa de layouts
export const layouts: LayoutMap = {
  private: (isAuth) => isAuth ? AdminLayout : false,
  guest: () => GuestLayout,
  public: () => PublicLayout
}

// Orden de prioridad
export const layoutOrder = ['private', 'guest', 'public']

interface Route {
  path: string
  component: Record<string, React.FC<any>>
  redirectTo?: string
}

// Rutas
export const routes: Route[] = [
  { path: '/', component: { public: HomePage, private: DashboardPage } },
  { path: '/ingresar', component: { guest: LoginPage } },
  { path: '/usuarios', component: { private: UsersPage } }
]
