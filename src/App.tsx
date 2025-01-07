import { BrowserRouter, Routes, Route } from 'react-router'
import MasterLayout from '@/layouts/MasterLayout'
import AdminLayout from '@/layouts/AdminLayout'
import GuestLayout from '@/layouts/GuestLayout'
import DashboardWidget from '@/components/modules/dashboard/DashboardWidget'
import DashboardPage from '@/pages/DashboardPage'
import NotFoundPage from '@/pages/Errors/NotFoundPage'
import LoginPage from '@/pages/Auth/LoginPage'
import RegisterPage from '@/pages/Auth/RegisterPage'
import ForgotPasswordPage from '@/pages/Auth/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/Auth/ResetPasswordPage'
import ProfilePage from '@/pages/Auth/ProfilePage'
import UsersPage from '@/pages/UsersPage'
import SettingsPage from '@/pages/SettingsPage'
import GeneralSettings from '@/components/modules/settings/GeneralSettings'
import ProfileSettings from '@/components/modules/settings/ProfileSettings'
import AuthSettings from '@/components/modules/settings/AuthSettings'
import ChangeLogPage from '@/pages/ChangeLogPage'
import HistoricalPage from '@/pages/HistoricalPage'
import UserDetailPage from '@/pages/UserDetailPage'

export default function App () {
  return (
    <MasterLayout>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route element={<GuestLayout />}>
            <Route path="/ingresar" element={<LoginPage />} />
            <Route path="/registrarse" element={<RegisterPage />} />
            <Route path="/recuperar-clave" element={<ForgotPasswordPage />} />
            <Route path="/restablecer-clave/:token" element={<ResetPasswordPage />} />
          </Route>

          {/* Rutas protegidas */}
          <Route element={<AdminLayout widgets={DashboardWidget} />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/perfil" element={<ProfilePage />} />

            <Route path="/usuarios">
              <Route index element={<UsersPage />} />
              <Route path=":id" element={<UserDetailPage />} />
            </Route>

            <Route path="/ajustes" element={<SettingsPage />}>
              <Route index element={<GeneralSettings />} />
              <Route path="generales" element={<GeneralSettings />} />
              <Route path="perfil" element={<ProfileSettings />} />
              <Route path="autenticacion" element={<AuthSettings />} />
            </Route>

            <Route path="/actualizaciones" element={<ChangeLogPage />} />
            <Route path="/historial" element={<HistoricalPage />} />
          </Route>

          {/* Otras rutas */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </MasterLayout>
  )
}
