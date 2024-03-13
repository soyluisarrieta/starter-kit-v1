import RegisterForm from '@/components/modules/auth/RegisterForm'
import { Button } from '@/components/ui/button'
import { Link } from 'wouter'

export default function RegisterPage (): JSX.Element {
  return (
    <main>
      <h1>Registrarse</h1>
      <RegisterForm />

      <div>
        ¿Ya tienes una cuenta?
        <Link to='/ingresar'>
          <Button variant='link'>
            Ingresar
          </Button>
        </Link>
      </div>
    </main>
  )
}
