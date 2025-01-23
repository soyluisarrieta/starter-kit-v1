import { BrowserRouter, Routes, Route } from 'react-router'
import MasterLayout from '@/layouts/MasterLayout'
import { lazy } from 'react'

const GuestLayout = lazy(() => import('@/layouts/GuestLayout'))
const LoginPage = lazy(() => import('@/pages/Auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/Auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/Auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/pages/Auth/ResetPasswordPage'))
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'))
const ProfilePage = lazy(() => import('@/pages/Auth/ProfilePage'))
const UsersPage = lazy(() => import('@/pages/UsersPage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))
const GeneralSettings = lazy(() => import('@/components/features/settings/GeneralSettings'))
const ProfileSettings = lazy(() => import('@/components/features/settings/ProfileSettings'))
const AuthSettings = lazy(() => import('@/components/features/settings/AuthSettings'))
const ChangeLogPage = lazy(() => import('@/pages/ChangeLogPage'))
const HistoricalPage = lazy(() => import('@/pages/HistoricalPage'))
const NotFoundPage = lazy(() => import('@/pages/Errors/NotFoundPage'))
const UserDetailPage = lazy(() => import('@/pages/UserDetailPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))

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
          <Route element={<AdminLayout />}>
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
