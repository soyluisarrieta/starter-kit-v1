import { Route, Switch } from 'wouter'
import MasterLayout from '@/components/layouts/MasterLayout'
import PublicLayout from '@/components/layouts/PublicLayout'
import AdminLayout from '@/components/layouts/AdminLayout'
import LoginPage from '@/components/pages/LoginPage'
import DashboardPage from '@/components/pages/DashboardPage'

export default function App (): JSX.Element {
  return (
    <MasterLayout>
      <Switch>
        <PublicLayout>
          <Route path="/" component={LoginPage} />
        </PublicLayout>
        <AdminLayout>
          <Route path="/" component={DashboardPage} />
        </AdminLayout>
      </Switch>
    </MasterLayout>
  )
}
