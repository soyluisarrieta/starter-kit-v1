import AdminLayout from '@/components/layouts/AdminLayout'
import GuestLayout from '@/components/layouts/GuestLayout'
import PublicLayout from '@/components/layouts/PublicLayout'

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
