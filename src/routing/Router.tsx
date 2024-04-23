import { Route, Switch } from 'wouter'
import MasterLayout from '@/components/layouts/MasterLayout'
import NotFoundPage from '@/components/pages/errors/NotFoundPage'
import AdminLayout from '@/components/layouts/AdminLayout'
import GuestLayout from '@/components/layouts/GuestLayout'
import { guestRoutes } from '@/routing/guestRoutes'
import { protectedRoutes } from '@/routing/protectedRoutes'

export default function Router (): JSX.Element {
  return (
    <MasterLayout>
      <Switch>
        {guestRoutes.map(({ path, component: Component }: GuestRouteConfig) => (
          <Route key={path} path={path}>
            <GuestLayout>
              <Component />
            </GuestLayout>
          </Route>
        ))}

        {protectedRoutes.map(({ path, component: Component, widgets, children }: ProtectedRouteConfig) => (
          <Route key={path} path={path}>
            <AdminLayout widgets={widgets}>
              {children
                ? (
                  <Switch>
                    {children.map(({ path: childPath, component: ChildComponent }) => (
                      <Route key={childPath} path={childPath}>
                        <ChildComponent />
                      </Route>
                    ))}
                  </Switch>
                  )
                : (
                  <Component />
                  )}
            </AdminLayout>
          </Route>
        ))}

        <Route component={NotFoundPage} />
      </Switch>
    </MasterLayout>
  )
}
