import { Route, Switch, useLocation } from 'wouter'
import { layoutOrder, layouts, routes } from '@/lib/wouter/router'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { useAuth } from '@/hooks/useAuth'
import Authenticating from '@/components/pages/Authenticating'
import MasterLayout from '@/components/layouts/MasterLayout'

export default function App (): JSX.Element {
  const isSessionVerified = useCheckAuth()
  const { isAuth } = useAuth()
  const [location, setLocation] = useLocation()

  // Checking authentication
  if (isAuth && !isSessionVerified) {
    return <Authenticating />
  }

  return (
    <MasterLayout>
      <Switch>
      {routes.map(({ path, component }) => {
        const numberComponents = Object.keys(component).length
        const components = layoutOrder.map((layoutPriorized) => {
          const Layout = layouts[layoutPriorized](isAuth)
          if (!Layout) {
            if (numberComponents === 1 && location === path) {
              setLocation('/ingresar', { state: { from: location }, replace: true })
            }
            return null
          }

          const Component = component[layoutPriorized] || null
          if (!Component) return null

          return (
              <Route path={path} key={path}>
                <Layout>
                  <Component />
                </Layout>
              </Route>
          )
        })
        return components.filter(Boolean)
      })}

        <Route>404: No such page!</Route>
      </Switch>
    </MasterLayout>
  )
}
