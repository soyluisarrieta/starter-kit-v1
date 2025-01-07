import { Route, Switch } from 'wouter'
import MasterLayout from '@/layouts/MasterLayout'
import AdminLayout from '@/layouts/AdminLayout'
import GuestLayout from '@/layouts/GuestLayout'
import { type RouteConfig, guestRoutes, protectedRoutes } from '@/routing/routes'
import { Fragment } from 'react/jsx-runtime'
import React from 'react'
import Wrapper from '@/components/ui/wrapper'
import NotFoundPage from '@/pages/Errors/NotFoundPage'

interface RouteProps extends RouteConfig {
  layout: React.ComponentType<any>
  subLayouts?: Array<React.ComponentType<any>>
}

const setRoutes = ({ layout: Layout, subLayouts = [], path, component: Component, nest, widgets }: RouteProps): JSX.Element => (
  <Fragment key={path}>
    <Route path={path}>
      <Layout widgets={widgets}>
        <Wrapper component={[...subLayouts, Component, ...(nest ? [nest[0].component] : [])]} />
      </Layout>
    </Route>

    {nest?.map(({ path: pathChild, ...routeProps }: RouteConfig) => setRoutes({
      layout: Layout,
      subLayouts: [...subLayouts, Component],
      path: path + pathChild,
      ...routeProps
    }))}
  </Fragment>
)

export default function Router (): JSX.Element {
  return (
    <MasterLayout>
      <Switch>
        {guestRoutes.map((routeProps: RouteConfig) => setRoutes({ layout: GuestLayout, ...routeProps }))}
        {protectedRoutes.map((routeProps: RouteConfig) => setRoutes({ layout: AdminLayout, ...routeProps }))}
        <Route component={NotFoundPage} />
      </Switch>
    </MasterLayout>
  )
}
