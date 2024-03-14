import { Button } from '@/components/ui/button'
import { Link } from 'wouter'
import ForgotPasswordForm from '@/components/modules/auth/ForgotPasswordForm'

export default function ForgotPassword (): JSX.Element {
  return (
    <main>
      <h1>Recuperar contraseña</h1>
      <ForgotPasswordForm />

      <div>
        <Link to='/registrarse'>
          <Button variant='link'>
            ¿Deseas volver a intentar?
          </Button>
        </Link>
      </div>
      <div>
        ¿No tienes una cuenta?
        <Link to='/registrarse'>
          <Button variant='link'>
            Regístrate
          </Button>
        </Link>
      </div>
    </main>
  )
}
