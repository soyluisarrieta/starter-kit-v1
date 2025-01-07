import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import ForgotPasswordForm from '@/components/modules/auth/ForgotPasswordForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircleIcon, TimerIcon } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function ForgotPasswordPage (): JSX.Element {
  const [isLinkSent, setIsLinkSent] = useState<boolean>(false)
  const [counter, setCounter] = useState(60)

  const navigate = useNavigate()

  // Counter
  useEffect(() => {
    if (!counter) return
    const intervalId = setInterval(() => {
      setCounter(counter - 1)
    }, 1000)
    return () => { clearInterval(intervalId) }
  }, [counter])

  // Redirect if password changed
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === 'passwordChanged' && e.newValue === 'true') {
        window.localStorage.removeItem('passwordChanged')
        navigate('/ingresar')
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  })

  const resetCounter = (): void => { setCounter(60) }

  return (
    <main className='min-h-screen flex flex-col justify-center items-center p-5'>
      <Card className='max-w-md w-full'>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            {isLinkSent
              ? <><CheckCircleIcon className='inline-block' size={24} /> ¡Enviado!</>
              : 'Recuperar contraseña'}
          </CardTitle>
          <CardDescription>
            {isLinkSent
              ? ('Le hemos enviado por correo electrónico el enlace para restablecer su contraseña.')
              : ('Ingresa tu correo electrónico para recibir enlace para recuperar tu contraseña.')}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {isLinkSent
            ? (
              <div className='flex items-center'>
                <Button
                  disabled={counter !== 0}
                  onClick={resetCounter}
                >
                  {counter === 0 ? ('Volver a intentar') : ('Revisa tu correo')}
                </Button>
                {counter !== 0 && (
                  <><TimerIcon className='ml-3 mr-1' size={16} /> {counter}</>
                )}
              </div>
            )
            : (
              <ForgotPasswordForm
                resetCounter={resetCounter}
                setIsLinkSent={setIsLinkSent}
              />
            )}
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
