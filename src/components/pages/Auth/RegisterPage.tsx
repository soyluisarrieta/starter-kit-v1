import RegisterForm from '@/components/modules/auth/RegisterForm'
import { Button } from '@/components/ui/button'
import { Link } from 'wouter'

export default function RegisterPage (): JSX.Element {
  const backendUrl = import.meta.env.VITE_BACKEND_URL_LOCAL

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

      <div>
        <a href={`${backendUrl}/login/google`}>
          <Button variant="outline">
            Google
          </Button>
        </a>
        <a href={`${backendUrl}/login/github`}>
          <Button variant="outline">
            Github
          </Button>
        </a>
        </div>
    </main>
  )
}
