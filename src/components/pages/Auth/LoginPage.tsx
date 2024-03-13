import LoginForm from '@/components/modules/auth/LoginForm'
import { Button } from '@/components/ui/button'
import { Link } from 'wouter'

export default function LoginPage (): JSX.Element {
  return (
    <main>
      <h1>Iniciar sesión</h1>
      <LoginForm />

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
