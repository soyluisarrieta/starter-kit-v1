import { Route, Switch, useLocation } from 'wouter'
import { layoutOrder, layouts, routes } from '@/lib/wouter/router'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { useAuth } from '@/hooks/useAuth'
import Authenticating from '@/components/pages/Authenticating'
import MasterLayout from '@/components/layouts/MasterLayout'
import NotFoundPage from '@/components/pages/Errors/NotFoundPage'

export default function App (): JSX.Element {
  const isSessionVerified = useCheckAuth()
  const { isAuth } = useAuth()
  const [location, setLocation] = useLocation()

  // Checking authentication
  if (isAuth && !isSessionVerified) {
    return <Authenticating />
  }

  // Routing
  const allRoutes = routes.map(({ path, component }) => {
    // Obtener número de componenetes de una sola ruta
    const numberComponents = Object.keys(component).length
    // Iterar componentes de una sola ruta pero en orden de prioridad
    const components = layoutOrder.map((layoutPrioritized) => {
      // Evaluar el layout priorizado
      const Layout = layouts[layoutPrioritized](isAuth)
      if (!Layout) {
        // Si el Layout es falsy, verificar si no cuenta con componentes alternativos
        // Pero también verificar si es exactamente la ruta actual
        if (numberComponents === 1 && location === path) {
          // Redireccionar al login en caso de que sea único componente
          // Ejem: /usuarios
          setLocation('/ingresar', { state: { from: location }, replace: true })
        }

        // Si se omite el condicional anterior, entonces evaluar
        // la siguiente ruta basandose en el orden de prioridad
        return null
      }

      // Si se obtuvo un layout correctamente
      // Obtener su correspondiente componente
      const Component = component[layoutPrioritized] || null
      if (!Component) return null
      // Ejem: Layout: "public", Component: HomePage

      // La ruta es definitivamente única
      // Ejem: "/"
      return (
        <Route path={path} key={path}>
          <Layout>
            <Component />
          </Layout>
        </Route>
      )
    })
    return components.filter(Boolean)
  })

  return (
    <MasterLayout>
      <Switch>
        {allRoutes}
        <Route component={NotFoundPage} />
      </Switch>
    </MasterLayout>
  )
}
