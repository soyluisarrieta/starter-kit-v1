import RegisterForm from '@/components/modules/auth/RegisterForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { InfoIcon } from 'lucide-react'

export default function RegisterPage (): JSX.Element {
  const backendUrl = import.meta.env.VITE_BACKEND_URL_LOCAL

  return (
    <main className='min-h-screen flex flex-col justify-center items-center p-5'>
      <Card className='max-w-md w-full'>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Crear cuenta</CardTitle>
          <CardDescription>
            Accede directamente con una de tus cuentas para registrarte.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline" asChild>
              <a href={backendUrl + '/login/github'}>
                <InfoIcon className="mr-2 h-4 w-4" />
                Github
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={backendUrl + '/login/google'}>
                <InfoIcon className="mr-2 h-4 w-4" />
                Google
              </a>
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O rellena el formulario
              </span>
            </div>
          </div>
          <RegisterForm />
        </CardContent>
      </Card>

      <div className='pt-4'>
        ¿Ya tienes una cuenta?
        <Button to='/ingresar' variant='link' className='ml-1.5'>
          Ingresar
        </Button>
      </div>
    </main>
  )
}
