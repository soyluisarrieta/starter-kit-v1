import LoginForm from '@/components/modules/auth/LoginForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { InfoIcon } from 'lucide-react'

export default function LoginPage (): JSX.Element {
  return (
    <main className='min-h-screen flex flex-col justify-center items-center p-5'>
      <Card className='max-w-md w-full'>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
          <CardDescription>
            Accede directamente con una de tus cuentas para ingresar.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <InfoIcon className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline">
              <InfoIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O introduce tus credenciales
              </span>
            </div>
          </div>
          <LoginForm />
        </CardContent>
      </Card>

      <div className='pt-4'>
        ¿No tienes una cuenta?
        <Button to='/registrarse' variant='link' className='ml-1.5'>
          Regístrate
        </Button>
      </div>
    </main>
  )
}
