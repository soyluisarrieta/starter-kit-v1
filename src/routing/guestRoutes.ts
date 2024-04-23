import ForgotPasswordPage from '@/components/pages/auth/ForgotPasswordPage'
import LoginPage from '@/components/pages/auth/LoginPage'
import RegisterPage from '@/components/pages/auth/RegisterPage'
import ResetPasswordPage from '@/components/pages/auth/ResetPasswordPage'

export const guestRoutes: GuestRouteConfig[] = [
  {
    path: '/ingresar',
    component: LoginPage
  },
  {
    path: '/registrarse',
    component: RegisterPage
  },
  {
    path: '/recuperar-contrasena',
    component: ForgotPasswordPage
  },
  {
    path: '/restablecer-contrasena/:token',
    component: ResetPasswordPage
  }
]
